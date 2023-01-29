/**
 *   Player Sleep Plugin - Enables 50% or 1 Player to sleep for everyone!
 *         Github: @BRadHoc/bdsx-sleep  Discord: @Brad (BDSX)
 */

/* ------- Configs ---------- */
let OnePlayerSleep = false;
let SleepRemind = true;
/*----------------------------*/

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { bedrockServer } = require("bdsx/launcher");
const { events } = require("bdsx/event");
const { ServerPlayer } = require("bdsx");
const { procHacker } = require("bdsx/bds/proc");
const { void_t, bool_t } = require("bdsx/nativetype");
const command = require("bdsx/commandresult");

console.log('[@BRadHoc/bdsx-sleep] Successfully loaded plugin');
events.serverOpen.on(() => {
    console.log('[@BRadHoc/bdsx-sleep] ' + (OnePlayerSleep ? "Setting: One Player Sleep (Enabled)" : "Setting: 50% of online players are required to sleep"));
});

let wakeUp = procHacker.js('?stopSleepInBed@ServerPlayer@@UEAAX_N0@Z', void_t, {this: ServerPlayer}, bool_t, bool_t);
events.playerSleepInBed.on((ev) => {
    setTimeout(() => {
        if (ev.player.isSleeping()) {

            const players = bedrockServer.level.getPlayers();
            const sleepingPlayers = players.filter((player) => player.isSleeping()).length;

            if (SleepRemind && !OnePlayerSleep) {
                SleepRemind = false;
                setTimeout(() => { SleepRemind = true; }, 30000);
            }

            setTimeout(() => {
                if (sleepingPlayers >= players.length / 2 || OnePlayerSleep) {
                    if (ev.player.isSleeping()) {
                        let weather = bedrockServer.executeCommand("weather query", command.CommandResultType.OutputAndData);
                        weather = weather.data.statusMessage.substring(18);
                        if (weather === "thunder" || weather === "rain") bedrockServer.executeCommand(`weather clear`);
                        let time = bedrockServer.executeCommand("time query daytime", command.CommandResultType.OutputAndData);
                        time = parseInt(time.data.statusMessage.substring(11));
                        const t_offset = (23999-time);
                        bedrockServer.executeCommand(`time add ${t_offset}`);

                        for (let x = 0; x < players.length; x++) {
                            if (players[x].isPlayer()) {
                                if (players[x].isSleeping()) {
                                    wakeUp.call(players[x], true, true);
                                }
                                let player = players[x].save();
                                player.SleepTimer._value = 0;
                                players[x].load(player);
                            }
                        }

                        if (OnePlayerSleep) bedrockServer.executeCommand(`tellraw @a {"rawtext":[{"text":"§b${ev.player.getNameTag()} just slept for everyone!"}]}`, () => { });
                        bedrockServer.executeCommand(`tellraw @a {"rawtext":[{"text":"§aGood Morning!"}]}`, () => { });
                    }
                }
            }, 2000);
        }
    }, 2000);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLHNDQUFvQztBQUVwQyxPQUFPLENBQUMsR0FBRyxDQUFDLDhCQUE4QixDQUFDLENBQUM7QUFFNUMsY0FBTSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsR0FBRSxFQUFFO0lBQ3JCLE9BQU8sQ0FBQyxHQUFHLENBQUMsOEJBQThCLENBQUMsQ0FBQztBQUNoRCxDQUFDLENBQUMsQ0FBQztBQUVILGNBQU0sQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLEdBQUUsRUFBRTtJQUN0QixPQUFPLENBQUMsR0FBRyxDQUFDLDJCQUEyQixDQUFDLENBQUM7QUFDN0MsQ0FBQyxDQUFDLENBQUMifQ==