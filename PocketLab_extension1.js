/* ScratchX extension for PocketLab */
/* copyright Myriad Sensors, Inc */

new (function() {
   
    var ext = this;
    var _statusCount = 0;
    var _accel_x = 0;
    var _accel_y = 0;
    var _accel_z = 0;
    var _accel_magnitude = 0;
    var _speed = 0;
    var _mag_x = 0;
    var _mag_y = 0;
    var _mag_z = 0;
    var _mag_magnitude = 0;
    var _altitude = 0;
    var _pressure = 0;
    var _temperature = 0;
    var _gyro_x = 0;
    var _gyro_y = 0;
    var _gyro_z = 0;
    var _port = null;
    var _intervalId = 0;
    var isChrome = !!window.chrome && !!window.chrome.webstore;
    var _connectCount = 0;
    
    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        if(isChrome == false)
            return {status: 1, msg: 'PocketLab ScratchX Extension is only supported on Chrome'};
        if(_port == null)
            return {status: 1, msg: 'PocketLab ScratchX Extension not connected'};
        if(_statusCount <= 0)
            return {status: 1, msg: 'PocketLab application not connected'};
        return {status: 2, msg: 'Ready'};
    };    
    
    ext.GetAccelX = function() {
        ext.EnsurePocketLabPoll();
        console.log('accelx:' + _accel_x);
        return _accel_x;
    };

    ext.GetAccelY = function() {
        ext.EnsurePocketLabPoll();
        return _accel_y;
    };
    
    ext.GetAccelZ = function() {
        ext.EnsurePocketLabPoll();
        return _accel_z;
    };
    
    ext.GetAccelMagnitude = function() {
        ext.EnsurePocketLabPoll();
        return _accel_magnitude;
    };
    
    ext.GetSpeed = function() {
        ext.EnsurePocketLabPoll();
        return _speed;
    };
        
    ext.GetMagX = function() {
        ext.EnsurePocketLabPoll();
        return _mag_x;
    };

    ext.GetMagY = function() {
        ext.EnsurePocketLabPoll();
        return _mag_y;
    };

    ext.GetMagZ = function() {
        ext.EnsurePocketLabPoll();
        return _mag_z;
    };

    ext.GetMagMagnitude = function() {
        ext.EnsurePocketLabPoll();
        return _mag_magnitude;
    };

    ext.GetAltitude = function() {
        ext.EnsurePocketLabPoll();
        return _altitude;
    };

    ext.GetPressure = function() {
        ext.EnsurePocketLabPoll();
        return _pressure;
    };
    
    ext.GetTemperature = function() {
        ext.EnsurePocketLabPoll();
        return _temperature;
    };
    
    ext.GetGyroX = function() {
        ext.EnsurePocketLabPoll();
        return _gyro_x;
    };
    
    ext.GetGyroY = function() {
        ext.EnsurePocketLabPoll();
        return _gyro_y;
    };
    
    ext.GetGyroZ = function() {
        ext.EnsurePocketLabPoll();
        return _gyro_z;
    };
    
    ext.EnsurePocketLabPoll = function() {
        if((_intervalId == 0) && (isChrome == true))
            _intervalId = window.setInterval(function() { ext.PollSensor(); }, 50);
    }
    
    ext._shutdown = function() {
        clearInterval(_intervalId);
    };
    
    
    ext.GetStatusCount = function() {
        return _statusCount;
    };    
    ext.PollSensor = function ()
    {
        _statusCount--;
        if(_statusCount < 0)
            _statusCount = 0;
        
        if(_port == null)
        {
            _port = chrome.runtime.connect('mjjkdikegondcpdflbniengckkedfooo');
            _port.onMessage.addListener(function(msg) {
                var found_data = false;
                var res = msg.split(';');
                for(i = 0;i<res.length;i++)
                {
                    var val = res[i].split(':');
                    if(val.length >= 2)
                    {
                        var n = Number(val[1]);
                        switch(val[0])
                        {
                            case 'AccelX':
                                _accel_x = n;
                                console.log('poll' + _accel_x);
                                found_data = true;
                                break;
                            case 'AccelY':
                                _accel_y = n;
                                break;
                            case 'AccelZ':
                                _accel_z = n;
                                found_data = true;
                                break;
                            case 'Speed':
                                _speed = n;
                                found_data = true;
                                break;
                            case 'AccelMagnitude':
                                _accel_magnitude = n;
                                found_data = true;
                                break;
                            case 'MagX':
                                _mag_x = n;
                                found_data = true;
                                break;
                            case 'MagY':
                                _mag_y = n;
                                found_data = true;
                                break;
                            case 'MagZ':
                                _mag_z = n;
                                found_data = true;
                                break;
                            case 'MagMagnitude':
                                _mag_magnitude = n;
                                found_data = true;
                                break;
                            case 'Altitude':
                                _altitude = n;
                                found_data = true;
                                break;
                            case 'Pressure':
                                _pressure = n;
                                found_data = true;
                                break;
                            case 'Temperature':
                                _temperature = n;
                                found_data = true;
                                break;
                            case 'GyroX':
                                _gyro_x = n;
                                found_data = true;
                                break;
                            case 'GyroY':
                                _gyro_y = n;
                                found_data = true;
                                break;
                            case 'GyroZ':
                                _gyro_z = n;
                                found_data = true;
                                break;
                        }
                    }
                }
                if(found_data)
                    _statusCount = 10;
            });
            _port.onDisconnect.addListener(function(obj) {
                _port = null;
            });
        }
        if(_port != null)
        {
            _port.postMessage('poll');
        }
    };
    
    // Block and block menu descriptions
    var descriptor = {
        blocks: [
            ['r', 'Get AccelX Value', 'GetAccelX'],
            ['r', 'Get AccelY Value', 'GetAccelY'],
            ['r', 'Get AccelZ Value', 'GetAccelZ'],
            ['r', 'Get AccelMagnitude Value', 'GetAccelMagnitude'],
            ['r', 'Get Speed Value', 'GetSpeed' ],
            ['r', 'Get MagX Value', 'GetMagX' ],
            ['r', 'Get MagY Value', 'GetMagY' ],
            ['r', 'Get MagZ Value', 'GetMagZ'],
            ['r', 'Get MagMagnitude Value', 'GetMagMagnitude'],
            ['r', 'Get Altitude Value', 'GetAltitude'],
            ['r', 'Get Pressure Value', 'GetPressure'],
            ['r', 'Get Temperature Value', 'GetTemperature'],
            ['r', 'Get GyroX Value', 'GetGyroX'],
            ['r', 'Get GyroY Value', 'GetGyroY'],
            ['r', 'Get GyroZ Value', 'GetGyroZ'],
            ['r', 'Get Status Count', 'GetStatusCount']
        ],
        url: 'http://ThePocketLab.github.io/ScratchX/README.md'
    };

    // Register the extension
    ScratchExtensions.register('PocketLab Extension', descriptor, ext);
    
    ext.EnsurePocketLabPoll();
})();
