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
    youtube.GetTopVideos();

    $("#json1").on("click", function () {
        $(".mainPage").hide();
        $(".json1").show();
    })

    $("button [data-value=Back]")
})

var instagram = {
    GetMostRecent: function() {
        $.ajax({
            url: "https://api.instagram.com/v1/tags/snow/media/recent?client_id=ba055438d6494230b8425f1b611b4e74",
            dataType: "jsonp",
            success: function (data) {
                $.each(data, function (index, value) {
                    //$.each(value, function (index2, value2) {
                    //    console.log("EACH OF VALUE: " + value2);
                    //})
                    if (index === "data") {
                        for (i = 0; i < value.length; i++) {
                            console.log(value[i].images);
                            $("#instagramView").append('<div class="instagramImage"><img src="' + value[i].images.thumbnail.url + '" /></div>');
                        }
                    }
                })
            }
        });
    }
}

var youtube = {
    GetTopVideos: function () {
        $.ajax({
            url: "http://gdata.youtube.com/feeds/api/standardfeeds/most_popular?v=2&alt=json",
            dataType: "jsonp",
            success: function (data) {
                var youtubeData = [];
                var youtubeObject = {};
                $.each(data, function (index, value) {
                    console.log(value);

                    if (index === "feed") {
                        $.each(value.entry, function (index2, value2) {
                            console.log(value2.yt$statistics.viewCount);
                            youtubeObject = {
                                videoTitle: value2.title.$t,
                                thumbnail: value2.media$group.media$thumbnail[0].url,
                                viewCount: value2.yt$statistics.viewCount
                            }
                            youtubeData.push(youtubeObject);
                        })
                    }
                })
                console.log(youtubeData);
            }
        });
    },
    GenerateChart: function () {

    }
}