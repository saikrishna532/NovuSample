//index.js
const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http').Server(app);
const PORT = 4000;
const { Novu, PushProviderIdEnum } = require("@novu/node");
const socketIO = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3000"
    }
});
const novu = new Novu("b744ffabd5e3d0b92b4cdd88cd54a898");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let eventList = [];

socketIO.on("connection", (socket) => {
	console.log(`⚡: ${socket.id} user just connected!`);

	socket.on("newSchedule", (schedule) => {
		eventList.unshift(schedule);
		socket.emit("sendSchedules", eventList);
	});

	let interval = setInterval(function () {
		if (eventList.length > 0) {
			for (let i = 0; i < eventList.length; i++) {
				if (
					Number(eventList[i].hour) === new Date().getHours() &&
					Number(eventList[i].minute) === new Date().getMinutes() &&
					new Date().getSeconds() === 0
				) {
					socket.emit("notification", {
						title: eventList[i].title,
						hour: eventList[i].hour,
						mins: eventList[i].minute,
					});
				}
			}
		}
	}, 1000);

	socket.on("disconnect", () => {
		socket.disconnect();
	});
});

app.get("/api", async (req, res) => {
    const subscriberId = "987654321";
    console.log('subscriber id');
    await novu.subscribers.identify(subscriberId, {
        firstName: "welcome",
        lastName: "novu",
    });

    await novu.subscribers.setCredentials(subscriberId, PushProviderIdEnum.FCM, {
        deviceTokens: ["f5e_OGwkWmckkchQe_6Q77:APA91bFrrnlDE2FD1pZVs4ptKTHzdnzesTxC0SByjeLVsYe1R-2zhZ2sLtMqvr-I3MHsKrAf2zJbxztJjf33rofilfISkUYKeYW-cAPNPS6f6x2QMQJdIbUHVcQhWArdARwY6fBnrOJD"],
    });

    const trigger = await novu.trigger("first-novu", {
        to: {
            subscriberId,
        },
    });

    res.json(trigger.data);
});

http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});