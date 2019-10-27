-- Compiled with https://roblox-ts.github.io v0.2.14
-- October 26, 2019, 9:27 PM Pacific Daylight Time

local TS = _G[script];
local exports = {};
TS.exportNamespace(TS.import(script, script, "Interfaces", "IConnectionManager"), exports);
TS.exportNamespace(TS.import(script, script, "Interfaces", "IReadOnlySignal"), exports);
TS.exportNamespace(TS.import(script, script, "Interfaces", "ISignal"), exports);
TS.exportNamespace(TS.import(script, script, "Interfaces", "ISignalConnection"), exports);
TS.exportNamespace(TS.import(script, script, "Implementation", "ConnectionManager"), exports);
TS.exportNamespace(TS.import(script, script, "Implementation", "Signal"), exports);
return exports;
