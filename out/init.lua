-- Compiled with https://roblox-ts.github.io v0.2.15-commit-6424488.0
-- October 26, 2019, 5:51 PM Pacific Daylight Time

local TS = _G[script];
local exports = {};
TS.exportNamespace(TS.import(script, script, "Interfaces", "IConnectionManager"), exports);
TS.exportNamespace(TS.import(script, script, "Interfaces", "IReadOnlySignal"), exports);
TS.exportNamespace(TS.import(script, script, "Interfaces", "ISignal"), exports);
TS.exportNamespace(TS.import(script, script, "Implementation", "ConnectionManager"), exports);
TS.exportNamespace(TS.import(script, script, "Implementation", "Signal"), exports);
return exports;
