
// HTML Worker Tests.
//

"use strict";

QUnit.test("Spawn workers", function(assert) {
    var worker_id1 = cotonic.spawn("hello-page-worker.js");
    var worker_id2 = cotonic.spawn("hello-page-worker.js");
    
    assert.equal(worker_id1 == worker_id2, false, "The workers should have differents wids");
});

QUnit.test("Send a message to a worker, and receive message back.", function(assert) {
    var done = assert.async();
    
    cotonic.receive(function(msg, msg_wid) {
	if(msg_wid != wid) return;

	assert.equal(msg, "Hello page!", "Got hello page!");
        cotonic.receive = undefined;
	done();
    });

    var wid = cotonic.spawn("hello-page-worker.js");
    cotonic.send(wid, "Hello worker!");
});
