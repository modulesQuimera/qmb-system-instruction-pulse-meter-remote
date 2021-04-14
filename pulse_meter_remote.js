module.exports = function(RED) {

	function pulse_meter_remoteNode(config) {
		RED.nodes.createNode(this,config);
		this.pulse_lag = config.pulse_lag;
        this.pulse_interval = config.pulse_interval;
        this.pulses = config.pulses;
        this.pulse_length = config.pulse_length;
        this.repeat_async = config.repeat_async;
        this.repeat_sync = config.repeat_sync;


		var node = this;
		
		node.on('input', function(msg) {
			var globalContext = node.context().global;
            var file = globalContext.get("exportFile");

            var command = {
                action: "pulse_meter_remote",
                payload: {
                    attributes: [
                        { pulse_lag:  parseInt(node.pulse_lag) },
                        { pulse_interval:  parseInt(node.pulse_interval) },
                        { pulses:  parseInt(node.pulses) },
                        { pulse_length:  parseInt(node.pulse_length) },
                        { repeat_async:  parseInt(node.repeat_async) },
                        { repeat_sync:  parseInt(node.repeat_sync) },
                    ],
                }
            };
       
            file.instructions.push(command);
            
			globalContext.set("exportFile", file);
			node.send(msg);
		});
	}
	RED.nodes.registerType("pulse_meter_remote", pulse_meter_remoteNode);
}