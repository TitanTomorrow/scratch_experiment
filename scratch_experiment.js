/* Extension testing app services */
/* Graham Chow graham_chow@yahoo.com */

new (function() {
    
	function loadLWinJS()
	{
	    $.getScript('http://titantomorrow.github.io/scratch_experiment/base.js').done(function (script, textStatus) {
			  console.log('Loaded BaseJS');

		  })
		  .fail(function (jqxhr, settings, exception) {
			  console.log('Error loading BaseJS');
		  });
	}

	loadLWinJS();
    
    var ext = this;
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
    var _app_family_name = 'MyriadSensors.PocketLab_7rn4hgttbgftw';
    var _app_service_name = 'com.thepocketlab';
    var _appConnection = null;
    var _status = "unknown";
    
    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };    
    
    ext.PollSensor = function ()
    {
        return 0;
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
    
    // Block and block menu descriptions
    var descriptor = {
        blocks: [
            ['w', 'PollSensor', 'PollSensor'],
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
