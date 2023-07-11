# Simple example using TagoIO Analysis

You can just upload the `analysis.js` file.

or

You can run locally, you should have last node version and install all dependencies running `npm install` on your terminal in this project folder,
after that, you can run the project just calling analysis, `node analysis.js`;

## What this does

This analysis must run by Time Interval. It checks if devices with given Tags had communication in the past minutes. If not, it sends an email or sms alert.

## How to use on TagoIO

In order to use this analysis, you must to add a new policy in your account and setup the Environment Variable table.<br>

Environment Variables:

    1 - checkin_time: Minutes between the last input of the device before sending the notification.

    2 - tag_key: Device tag Key to filter the devices.

    3 - tag_value: Device tag Value to filter the devices.

    4 - email_list: Email list comma separated.

    5 - sms_list: Phone number list comma separated. The phone number must include the country code


Steps to add a new policy:

   1 - Click the button "Add Policy" at this url: https://admin.tago.io/am;

   2 - In the Target selector, select the Analysis with the field set as "ID" and choose your Analysis in the list;

   3 - Click the "Click to add a new permission" element and select "Device" with the rule "Access" with the field as "Any";

   4 - To save your new Policy, click the save button in the bottom right corner;<br>
