/* Extension testing app services */
/* Graham Chow graham_chow@yahoo.com */

new (function() {
   
    var ext = this;
    var _status = "unknown";
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
    
    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };    
    
    ext.GetStatus = function() {
        return _status;
    };    
    
    ext.GetAccelX = function() {
       return _accel_x;
    };

    ext.GetAccelY = function() {
       return _accel_y;
    };
    
    ext.GetAccelZ = function() {
       return _accel_z;
    };
    
    ext.GetAccelMagnitude = function() {
       return _accel_magnitude;
    };
    
    ext.GetSpeed = function() {
       return _speed;
    };
        
    ext.GetMagX = function() {
       return _mag_x;
    };

    ext.GetMagY = function() {
       return _mag_y;
    };

    ext.GetMagZ = function() {
       return _mag_z;
    };

    ext.GetMagMagnitude = function() {
       return _mag_magnitude;
    };

    ext.GetAltitude = function() {
       return _altitude;
    };

    ext.GetPressure = function() {
       return _pressure;
    };
    
    ext.GetTemperature = function() {
       return _temperature;
    };
    
    ext.GetGyroX = function() {
       return _gyro_x;
    };
    
    ext.GetGyroX = function() {
       return _gyro_y;
    };
    
    ext.GetGyroX = function() {
       return _gyro_z;
    };
    
    ext.PollSensor = function (msg)
    {
        if(_port == null)
        {
            _port = chrome.runtime.connect('eakblppkkhgkfpahgflkokgpgohbkcjn');
            _port.onMessage.addListener(function(msg) {
                console.log(msg.text);
                var res = msg.text.split(';');
                for(i = 0;i<res.length;i++)
                {
                    var val = res[i].split(' ');
                    if(val.length >= 2)
                    {
                        var n = Number(val[1]);
                        switch(val[0])
                        {
                            case 'AccelX':
                                _accel_x = n;
                                break;
                            case 'AccelY':
                                _accel_y = n;
                                break;
                            case 'AccelZ':
                                _accel_z = n;
                                break;
                            case 'Speed':
                                _speed = n;
                                break;
                            case 'AccelMagnitude':
                                _accel_magnitude = n;
                                break;
                            case 'MagX':
                                _mag_x = n;
                                break;
                            case 'MagY':
                                _mag_y = n;
                                break;
                            case 'MagZ':
                                _mag_z = n;
                                break;
                            case 'MagMagnitude':
                                _mag_magnitude = n;
                                break;
                            case 'Altitude':
                                _altitude = n;
                                break;
                            case 'Pressure':
                                _pressure = n;
                                break;
                            case 'Temperature':
                                _temperature = n;
                                break;
                            case 'GyroX':
                                _gyro_x = n;
                                break;
                            case 'GyroY':
                                _gyro_y = n;
                                break;
                            case 'GyroZ':
                                _gyro_z = n;
                                break;
                        }
                    }
                }
            });
            _port.onDisconnect.addListener(function(obj) {
                _port = null;
            });
        }
        if(_port != null)
        {
            console.log('send poll');
            _port.postMessage('poll');
        }
    };
    
    // Block and block menu descriptions
    var descriptor = {
        blocks: [
            [' ', 'PollSensor', 'PollSensor'],
            ['r', 'Get Status', 'GetStatus'],
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
            ['r', 'Get GyroZ Value', 'GetGyroZ']
        ]
    };

    // Register the extension
    ScratchExtensions.register('Test Extension', descriptor, ext);
})();
