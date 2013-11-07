/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

/* Author: Garrett More
   Class: AVF 1311
*/

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        instagram.GetMostRecent();
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
    }
};

//REMOVE WHEN TESTING APP ON IPAD
$(document).ready(function () {
    instagram.GetMostRecent();
})

var instagram = {
    GetMostRecent: function()
    {
        $.ajax({
            url: "https://api.instagram.com/v1/tags/snow/media/recent?access_token=651172266.f59def8.c3ab4d9d5626437f83dc92e6961856a6",
            dataType: "jsonp",
            success: function (data) {
                console.log(data);
            }
        });
    }
}
