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
                        { name: "pulse_lag", value: parseInt(node.pulse_lag) },
                        { name: "pulse_interval", value: parseInt(node.pulse_interval) },
                        { name: "pulses", value: parseInt(node.pulses) },
                        { name: "pulse_length", value: parseInt(node.pulse_length) },
                        { name: "repeat_async", value: parseInt(node.repeat_async) },
                        { name: "repeat_sync", value: parseInt(node.repeat_sync) },
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