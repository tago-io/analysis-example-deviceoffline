# Simple example using TagoIO Analysis

You can just upload the `analysis.js` file.

or

Run it locally, you should have lastest node version and install all the dependencies by running `npm install` in your terminal in the project's directory,
after that, you can run the project by calling the analysis, `node analysis.js`;

## What the analysis does

This analysis must run by triggered by a Time Interval. It checks whether devices with given Tags checked in, in the past minutes. If not, it sends an email or sms alert.

## How to use this analysis internally at TagoIO servers

In order to use this analysis, you must to add a new policy in your account and setup the Environment Variable table.<br>

Environment Variables:

    1 - checkin_time: Minutes between the last input of the device before sending the notification.

    2 - tag_key: Device tag Key to filter the devices.

    3 - tag_value: Device tag Value to filter the devices.

    4 - email_list: Email list comma separated.

    5 - sms_list: Phone number list comma separated. The phone number must include the country code.


Steps to add a new policy:

   1 - Click the button "Add Policy" at this url: https://admin.tago.io/am;

   2 - In the Target selector, with the field set as "ID", choose your Analysis in the list;

   3 - Click the "Click to add a new permission" element and select "Device" with the rule "Access" with the field as "Any";

   4 - To save your new Policy, click the save button in the bottom right corner;<br>
