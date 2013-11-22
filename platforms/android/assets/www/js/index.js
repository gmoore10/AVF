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

        $("#json1").on("click", function () {
            $(".mainPage").hide();
            $(".json1").show();
        })

        $("#json2").on("click", function () {
            $(".mainPage").hide();
            $(".json2").show();
            youtube.GetTopVideos();
        })

        $("#native1").on("click", function () {
            $(".mainPage").hide();
            $(".native1").show();
            nativeFeatures.notifications.notification1();
        })

        $("#native2").on("click", function () {
            $(".mainPage").hide();
            $(".native2").show();
            nativeFeatures.contacts.getContacts();
        })

        $("#native3").on("click", function () {
            $(".mainPage").hide();
            $(".native3").show();
            nativeFeatures.geolocation.getLocation();
        })

        $("#native4").on("click", function () {
            $(".mainPage").hide();
            $(".native4").show();
            nativeFeatures.network.getNetworkInfo();
        })

        $("#mashup1").on("click", function () {
            $(".mainPage").hide();
            $(".mashup1").show();
            mashups.mashup1();
        })

        $("#mashup2").on("click", function () {
            $(".mainPage").hide();
            $(".mashup2").show();
            mashups.mashup2.getLocation();
        })

        $("button").on("click", function () {
            $(".mainPage").show();
            $(".app").not(".mainPage").hide();
        })
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
    }
};

var mashups = {
    mashup1: function() {
        var networkStatus = nativeFeatures.network.getNetworkInfo();

        $.ajax({
            url: "https://api.instagram.com/v1/tags/snow/media/recent?client_id=ba055438d6494230b8425f1b611b4e74",
            dataType: "jsonp",
            success: function (data) {
                $.each(data, function (index, value) {
                    if (index === "data") {
                        for (i = 0; i < value.length; i++) {
                            console.log(value[i].images);
                            if(networkStatus === "wifi")
                            {
                                $("#mashup1View").append('<div class="instagramImage"><img src="' + value[i].images.thumbnail.url + '" /></div>');
                            }
                            else {
                                $("#mashup1View").append('<div class="instagramImage"><a href"' + value[i].images.thumbnail.url + '">' + value[i].caption.text + '</a></div>');
                            }
                        }
                    }
                });
            }
        });

    },
    mashup2: {
        getLocation: function() {
            navigator.geolocation.getCurrentPosition(mashups.mashup2.getSuccess, mashups.mashup2.getFailed);
        },
        getSuccess: function(location) {
            //Success
            $.ajax({
            url: "https://api.instagram.com/v1/media/search?lat=" + location.coords.latitude + "&lng=" + location.coords.longitude + "&distance=5000&client_id=ba055438d6494230b8425f1b611b4e74",
            dataType: "jsonp",
            success: function (data) {
                $("#mashup2View").empty();
                $("#mashup2View").append("Images taken within roughly 1 mile of your location.<br />");
                $.each(data, function (index, value) {
                    if (index === "data") {
                        for (i = 0; i < value.length; i++) {
                            console.log(value[i].images);
                            $("#mashup2View").append('<div class="instagramImage"><img src="' + value[i].images.thumbnail.url + '" /></div>');
                        }
                    }
                });
            }
            });
        },
        getFailed: function () {
            //Failed
            navigator.notification.alert("Geolocation access failed!", function() {}, "Geolocation Issue!", "Got it!");
        }
    }
}

var nativeFeatures = {
    notifications: {
        notification1: function() {
            navigator.notification.alert("Message!", nativeFeatures.notifications.notification1Callback(), "Woop Woop!", "Got it!");
        },
        notification1Callback: function() {
            //Do something
        }
    },
    contacts: {
        getContacts: function()
        {
            //Get all contacts
            navigator.contacts.find(["*"], nativeFeatures.contacts.getSuccess, nativeFeatures.contacts.getFailed(), {filter: "", multiple: true });
        },
        getSuccess: function(contacts) {
            //Success
            //navigator.notification.alert("Contacts access succeeded! Count: " + contacts.length, nativeFeatures.notifications.notification1Callback(), "Woop Woop!", "Got it!");
            for (i = 0; i < contacts.length; i++)
            {
                $("#contactsView").append(contacts[i].name.formatted + "<br />");
            }
        },
        getFailed: function () {
            //Failed
        }

    },
    geolocation: {
        getLocation: function() {
            navigator.geolocation.getCurrentPosition(nativeFeatures.geolocation.getSuccess, nativeFeatures.geolocation.getFailed);
        },
        getSuccess: function(location) {
            //Success
            //navigator.notification.alert("Geolocation access succeeded! Count: " + location.length, nativeFeatures.notifications.notification1Callback(), "Woop Woop!", "Got it!");
                $("#geolocationView").append("Lattitude: " + location.coords.latitude + " Longitude: " + location.coords.longitude + "<br />");
        },
        getFailed: function () {
            //Failed
            navigator.notification.alert("Geolocation access failed!", function() {}, "Woop Woop!", "Got it!");
        }
    },
    network: {
        getNetworkInfo: function() {
            var networkStatus = navigator.connection.type;


            $("#networkView").empty();
            switch(networkStatus)
            {
                case "wifi":
                    $("#networkView").append("Network Status: WiFi");
                    break;
                case "unknown":
                    $("#networkView").append("Network Status: Unknown");
                    break;
                case "ethernet":
                    $("#networkView").append("Network Status: Ethernet");
                    break;
                case "2g":
                    $("#networkView").append("Network Status: 2G Cellular");
                    break;
                case "3g":
                    $("#networkView").append("Network Status: 3G Cellular");
                    break;
                case "4g":
                    $("#networkView").append("Network Status: 4G Cellular");
                    break;
                case "cell":
                    $("#networkView").append("Network Status: Cellular (Unknown Type)");
                    break;
                case "none":
                    $("#networkView").append("Network Status: None");
                    break;
                default: 
                    alert("Catastrophic Error." + networkStatus);
            }

            return networkStatus;
        }
    }
};

var instagram = {
    GetMostRecent: function() {
        $.ajax({
            url: "https://api.instagram.com/v1/tags/snow/media/recent?client_id=ba055438d6494230b8425f1b611b4e74",
            dataType: "jsonp",
            success: function (data) {
                $.each(data, function (index, value) {
                    if (index === "data") {
                        for (i = 0; i < value.length; i++) {
                            console.log(value[i].images);
                            $("#instagramView").append('<div class="instagramImage"><img src="' + value[i].images.thumbnail.url + '" /></div>');
                        }
                    }
                });
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
                youtube.GenerateChart(youtubeData);
            }
        });
},
GenerateChart: function (youtubeData) {
    $("#youtubeView").kendoChart({
        title: {
            text: "Youtube Top Videos"
        },
        dataSource: youtubeData,
        legend: {
            visible: false
        },
        seriesDefaults: {
            type: "column"
        },
        series: [
        { field: "viewCount" }
        ],
        tooltip: {
            visible: true,
            template: '#= dataItem.videoTitle # <br />  Total Views: #= value #<br /><img src="#= dataItem.thumbnail #" />'
        }
    });

    $(window).resize(function () {
        var youtubeChart = $("#youtubeView").data("kendoChart");
        youtubeChart.refresh();

    });
}
}