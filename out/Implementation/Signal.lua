-- Compiled with https://roblox-ts.github.io v0.2.15-commit-6424488.0
-- October 26, 2019, 5:51 PM Pacific Daylight Time

local TS = _G[script];
local exports = {};
local _0 = TS.import(script, TS.getModule(script, "services"));
local RunService, Players = _0.RunService, _0.Players;
local SignalConnection;
do
	SignalConnection = setmetatable({}, {
		__tostring = function() return "SignalConnection" end;
	});
	SignalConnection.__index = SignalConnection;
	function SignalConnection.new(...)
		local self = setmetatable({}, SignalConnection);
		self:constructor(...);
		return self;
	end;
	function SignalConnection:constructor(disconnectCallback)
		self.Connected = false;
		self._disconnectCallback = disconnectCallback;
	end;
	function SignalConnection:Disconnect()
		if not (self.Connected) then
			return nil;
		end;
		self._disconnectCallback();
		self.Connected = false;
	end;
end;
local Signal;
do
	Signal = setmetatable({}, {
		__tostring = function() return "Signal" end;
	});
	Signal.__index = Signal;
	function Signal.new(...)
		local self = setmetatable({}, Signal);
		self:constructor(...);
		return self;
	end;
	function Signal:constructor(...)
		self._connections = {};
		self._connectionsHandlersMap = {};
		self._lastFiredTick = 0;
	end;
	function Signal:Connect(onFiredCallback)
		local connection;
		connection = SignalConnection.new(function()
			if not (self._connectionsHandlersMap[connection] ~= nil) then
				return nil;
			end;
			self._connectionsHandlersMap[connection] = nil;
			do
				local i = 0;
				while i < #self._connections do
					if self._connections[i + 1] == connection then
						table.remove(self._connections, i + 1);
						break;
					end;
					local _ = Players.PlayerAdded.Connect;
					i = i + 1;
				end;
			end;
		end);
		local _1 = self._connectionsHandlersMap;
		_1[connection] = onFiredCallback;
		local _2 = self._connections;
		_2[#_2 + 1] = connection;
		return connection;
	end;
	function Signal:DisconnectAll()
		TS.map_clear(self._connectionsHandlersMap);
		do
			local i = 0;
			while i < #self._connections do
				self._connections[i + 1]:Disconnect();
				i = i + 1;
			end;
		end;
		self._connections = {};
	end;
	function Signal:Fire(...)
		local args = { ... };
		self._lastFiredArgs = args;
		self._lastFiredTick = tick();
		do
			local i = 0;
			while i < #self._connections do
				local handlerFunction = self._connectionsHandlersMap[self._connections[i + 1]];
				if handlerFunction ~= nil then
					coroutine.wrap(handlerFunction)(unpack(args));
				end;
				i = i + 1;
			end;
		end;
	end;
	function Signal:Wait()
		local lastFiredTickAtStart = self._lastFiredTick;
		while self._lastFiredTick == lastFiredTickAtStart do
			RunService.Heartbeat:Wait();
		end;
		return unpack(self._lastFiredArgs);
	end;
end;
exports.Signal = Signal;
return exports;
