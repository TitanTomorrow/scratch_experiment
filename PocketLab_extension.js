/* ScratchX extension for PocketLab */
/* copyright Myriad Sensors, Inc */
/* http://scratchx.org/?url=http://titantomorrow.github.io/scratch_experiment/PocketLab_extension.js */

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
    
    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        if(_port == null)
            return {status: 1, msg: 'PocketLab ScratchX Extension not connected'};
        if(_statusCount <= 0)
            return {status: 1, msg: 'PocketLab application not connected'};
        return {status: 2, msg: 'Ready'};
    };    
    
    ext.GetAccelX = function() {
        console.log('get accel poll');
        EnsurePocketLabPoll();
        return _accel_x;
    };

    ext.GetAccelY = function() {
        EnsurePocketLabPoll();
        return _accel_y;
    };
    
    ext.GetAccelZ = function() {
        EnsurePocketLabPoll();
        return _accel_z;
    };
    
    ext.GetAccelMagnitude = function() {
        EnsurePocketLabPoll();
        return _accel_magnitude;
    };
    
    ext.GetSpeed = function() {
        EnsurePocketLabPoll();
        return _speed;
    };
        
    ext.GetMagX = function() {
        EnsurePocketLabPoll();
        return _mag_x;
    };

    ext.GetMagY = function() {
        EnsurePocketLabPoll();
        return _mag_y;
    };

    ext.GetMagZ = function() {
        EnsurePocketLabPoll();
        return _mag_z;
    };

    ext.GetMagMagnitude = function() {
        EnsurePocketLabPoll();
        return _mag_magnitude;
    };

    ext.GetAltitude = function() {
        EnsurePocketLabPoll();
        return _altitude;
    };

    ext.GetPressure = function() {
        EnsurePocketLabPoll();
        return _pressure;
    };
    
    ext.GetTemperature = function() {
        EnsurePocketLabPoll();
        return _temperature;
    };
    
    ext.GetGyroX = function() {
        EnsurePocketLabPoll();
        return _gyro_x;
    };
    
    ext.GetGyroX = function() {
        EnsurePocketLabPoll();
        return _gyro_y;
    };
    
    ext.GetGyroX = function() {
        EnsurePocketLabPoll();
        return _gyro_z;
    };
    
    ext.EnsurePocketLabPoll = function() {
        console.log('ensure poll');
        if(_intervalId == 0)
            _intervalId = window.setInterval(function() { ext.PollSensor(); }, 50);
    }
    
    ext._shutdown = function() {
        clearInterval(_intervalId);
    };
    
    ext.PollSensor = function ()
    {
        console.log('poll');
        _statusCount--;
        if(_statusCount < 0)
            _statusCount = 0;
        
        if(_port == null)
        {
            _port = chrome.runtime.connect('eakblppkkhgkfpahgflkokgpgohbkcjn');
            _port.onMessage.addListener(function(msg) {
                console.log(msg);
                _statusCount = 10;
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
        ],
        url: 'http://titantomorrow.github.io/scratch_experiment/README.md'
    };

    // Register the extension
    ScratchExtensions.register('PocketLab Extension', descriptor, ext);
})();
