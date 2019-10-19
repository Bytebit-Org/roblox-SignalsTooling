-- Compiled with https://roblox-ts.github.io v0.2.14
-- October 18, 2019, 7:12 PM Pacific Daylight Time

local TS = _G[script];
local exports;
local ConnectionManager = TS.import(script, "Implementation", "ConnectionManager");
local Signal = TS.import(script, "Implementation", "Signal");
exports = {
	ConnectionManager = ConnectionManager;
	Signal = Signal;
};
return exports;
