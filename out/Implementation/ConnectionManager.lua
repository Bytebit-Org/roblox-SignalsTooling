-- Compiled with https://roblox-ts.github.io v0.2.14
-- October 18, 2019, 7:23 PM Pacific Daylight Time

local exports;
local ConnectionManager;
do
	ConnectionManager = setmetatable({}, {
		__tostring = function() return "ConnectionManager" end;
	});
	ConnectionManager.__index = ConnectionManager;
	function ConnectionManager.new(...)
		local self = setmetatable({}, ConnectionManager);
		self:constructor(...);
		return self;
	end;
	function ConnectionManager:constructor(...)
		self._connectionData = {};
	end;
	function ConnectionManager:AddConnectionData(signal, handlerFunction)
		local _0 = self._connectionData;
		_0[#_0 + 1] = {
			HandlerFunction = handlerFunction;
			Signal = signal;
		};
	end;
	function ConnectionManager:ConnectAll()
		do
			local i = 0;
			while i < #self._connectionData do
				local connectionInfo = self._connectionData[i + 1];
				if connectionInfo.Connection == nil then
					connectionInfo.Connection = connectionInfo.Signal:Connect(connectionInfo.HandlerFunction);
				end;
				i = i + 1;
			end;
		end;
	end;
	function ConnectionManager:ConnectToEvent(signal, handlerFunction)
		local connection = signal:Connect(handlerFunction);
		local _0 = self._connectionData;
		_0[#_0 + 1] = {
			Connection = connection;
			HandlerFunction = handlerFunction;
			Signal = signal;
		};
	end;
	function ConnectionManager:DisconnectAll()
		do
			local i = 0;
			while i < #self._connectionData do
				local connectionInfo = self._connectionData[i + 1];
				if connectionInfo.Connection ~= nil then
					connectionInfo.Connection:Disconnect();
					connectionInfo.Connection = nil;
				end;
				i = i + 1;
			end;
		end;
	end;
	function ConnectionManager:Reset()
		self:DisconnectAll();
		self._connectionData = {};
	end;
end;
exports = ConnectionManager;
return exports;
