/*
** Analysis Example
** Device Offline Alert
**
** This analysis must run by Time Interval. It checks if devices with given Tags
** had communication in the past minutes. If not, it sends an email or sms alert.
**
** Environment Variables
** In order to use this analysis, you must setup the Environment Variable table.
**
** account_token: Your account token
** checkin_time: Minutes between the last input of the device before sending the notification.
** tag_key: Device tag Key to filter the devices.
** tag_value: Device tag Value to filter the devices.
** email_list: Email list comma separated.
** sms_list: SMS list comma separated.
**
** Steps to generate an account_token:
** 1 - Enter the following link: https://admin.tago.io/account/
** 2 - Select your Profile.
** 3 - Enter Tokens tab.
** 4 - Generate a new Token with Expires Never.
** 5 - Press the Copy Button and place at the Environment Variables tab of this analysis.
* */

const TagoAccount   = require('tago/account');
const TagoUtils     = require('tago/utils');
const TagoAnalisys  = require('tago/analysis');
const TagoServices  = require('tago/services');
const moment        = require('moment-timezone');

async function func(context) {
  // Transform all Environment Variable to JSON.
  const env = TagoUtils.env_to_obj(context.environment);

  if (!env.account_token) return context.log('You must setup an account_token in the Environment Variables.');
  else if (!env.checkin_time) return context.log('You must setup a checkin_time in the Environment Variables.');
  else if (!env.tag_key) return context.log('You must setup a tag_key in the Environment Variables.');
  else if (!env.tag_value) return context.log('You must setup a tag_value in the Environment Variables.');
  else if (!env.email_list && !env.sms_list) return context.log('You must setup an email_list or a sms_list in the Environment Variables.');

  const checkin_time = Number(env.checkin_time);
  if (Number.isNaN(checkin_time)) return context.log('The checkin_time must be a number.');

  const account = new TagoAccount(env.account_token);

  // You can comment line 28 and 29 to remove the Tag Filter.
  // In this case, set line 38 to " filter = {}; "
  const filter = { tags: [{ key: env.tag_key, value: env.tag_value }] };
  const devices = await account.devices.list(1, ['id', 'name', 'last_input'], filter, 9999);

  if (!devices.length) return context.log(`No device found with given tags. Key: ${env.tag_key}, Value: ${env.tag_value} `);
  context.log('Checking devices: ', devices.map(x => x.name).join(', '));

  const now = moment();
  const alert_devices = [];
  for (const device of devices) {
    const last_input = moment(new Date(device.last_input));

    // Check the difference in minutes.
    const diff = now.diff(last_input, 'minute');
    if (diff > checkin_time) {
      alert_devices.push(device.name);
    }
  }

  if (!alert_devices.length) return context.log('All devices are okay.');

  context.log('Sending notifications');
  const emailService = new TagoServices(context.token).email;
  const smsService = new TagoServices(context.token).sms;

  let message = `Hi!\nYou're receiving this alert because the following devies didn't send data in the last ${checkin_time} minutes.\n\nDevices:`;
  message += alert_devices.join('\n');

  if (env.email_list) {
    // Remove space in the string
    const emails = env.email_list.replace(/ /g, '');
    emailService.send(emails, 'Device Offline Alert', message);
  }


  if (env.sms_list) {
    // Remove space in the string and convert to an Array.
    const sms = env.sms_list.replace(/ /g, '').split(',');

    sms.forEach((phone) => {
      const to = phone;
      smsService.send(to, message);
    });
  }
}

module.exports = new TagoAnalisys(func, '75e4546d-e52c-4ad8-9ff8-4c5188e2bf24');
