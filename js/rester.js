

function TestCase(url) {
    this.url = url;
}

function TestSuite() {
    this._testCases = new Array();
    this.succeeded = 0;
    this.failed = 0;
}

TestSuite.prototype = {
    constructor: TestSuite,

    updateProcessBar: function() {
        var spercentage = Math.round((this.succeeded / this._testCases.length)*100);
        $("#barsuccess").css("width", spercentage + "%");

        var fpercentage = Math.round((this.failed / this._testCases.length)*100);
        $("#barfailed").css("width", fpercentage + "%");
    },

    executeTestCase: function(testCase, finishFunction) {
        var sself = this;
        
        $.get(testCase.url, function(data) {
          $("#testcase").append("<p>" + testCase.url + " - PASSED</p>");
          sself.succeeded+=1;
          sself.updateProcessBar();
        }).fail(function() { 
            $("#testcase").append("<p>" + testCase.url + " - FAILED</p>");
            sself.failed+=1;
            sself.updateProcessBar();
        }).always(function() {
            // Check if all tests are executed
            if (sself.succeeded + sself.failed == sself._testCases.length) {
                finishFunction(sself._testCases.length, sself.succeeded, sself.failed);
            }
        });
    },

    run: function(finishFunction) {
        for (var i=0;i<this._testCases.length;i++) { 
            this.executeTestCase(this._testCases[i], finishFunction);
        }
    },

    add: function(testCase) {
        this._testCases.push(testCase);
    }
}

function runTests() {

    // Disable run button, enable stop button
    $("#runButton").toggleClass("disabled");
    $("#stopButton").toggleClass("disabled");

    $("#testcase").html("");
    $("#output").html("");
    $("#barsuccess").css("width", 0 + "%");

    var testSuite = new TestSuite();
    testSuite.add(new TestCase('http://127.0.0.1:9000/v1/books/adfg1234fa45'));
    testSuite.add(new TestCase('http://127.0.0.1:9000/v1/books/adfg1234fa45'));
    testSuite.add(new TestCase('http://127.0.0.1:9000/v1/books/adfg1234fa45'));
    testSuite.add(new TestCase('http://127.0.0.1:9000/v1/books/adfg1234fa45'));
    testSuite.add(new TestCase('http://127.0.0.1:9000/v1/books/adfg1234fa45'));
    testSuite.add(new TestCase('http://127.0.0.1:9000/v1/books/adfg1234fa45'));
    testSuite.add(new TestCase('http://127.0.0.1:9000/v1/books/adfg1234fa45'));
    testSuite.add(new TestCase('http://127.0.0.1:9000/v1/books/adfg1234fa45'));
    testSuite.add(new TestCase('http://127.0.0.1:9000/v1/books/adfg1234fa45'));
    testSuite.add(new TestCase('http://127.0.0.1:9003/v1/books/adfg1234fa45'));
    testSuite.add(new TestCase('http://127.0.0.1:9000/v1/books/adfg1234fa45'));
    testSuite.add(new TestCase('http://127.0.0.1:9000/v1/books/adfg1234fa45'));
    testSuite.add(new TestCase('http://127.0.0.1:9002/v1/books/adfg1234fa45'));
    testSuite.add(new TestCase('http://127.0.0.1:9000/v1/books/adfg1234fa45'));
    testSuite.add(new TestCase('http://127.0.0.1:9000/v1/books/adfg1234fa45'));
    testSuite.add(new TestCase('http://127.0.0.1:9000/v1/books/adfg1234fa45'));
    testSuite.add(new TestCase('http://127.0.0.1:9000/v1/books/adfg1234fa45'));
    testSuite.add(new TestCase('http://127.0.0.1:9000/v1/books/adfg1234fa45'));
    testSuite.add(new TestCase('http://127.0.0.1:9020/v1/books/adfg1234fa45'));

    testSuite.run(function (testsFinished, passed, failed) {
        // Finish event, update buttons to original
        $("#runButton").toggleClass("disabled");
        $("#stopButton").toggleClass("disabled");
        $("#output").append("<b>Finished " + testsFinished + " tests! " + passed + " tests passed. " + failed + " tests failed.</b>");
    });
}