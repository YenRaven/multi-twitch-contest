# multi-twitch-contest
site: http://multi-twitch-contest.openode.io/

*This services is provided as is, without any guarantee and may be discontinued without warning at any time.  **Use at your own risk.*** 

This project enables twitch streamers who are streaming together to enter their chats into the same contest drawing.  Chatters can then join the contest and one can be chosen at random from all who joined.

## Nightbot Commands

it is recommend to use nightbot custom commands to enable these features.

| Command | Message | Userlevel |
| ------- | ------- | --------- |
| `!join` | `$(urlfetch http://multi-twitch-contest.openode.io/register/$(channel)/$(user))` | Everyone |
| `!join-giveaway` | `$(urlfetch http://multi-twitch-contest.openode.io/join-giveaway/$(channel)/$(1))` | Moderator |
| `!multi-new-winner` | `$(urlfetch http://multi-twitch-contest.openode.io/new-winner/$(channel))` | Moderator |
| `!multi-winner` | `$(urlfetch http://multi-twitch-contest.openode.io/get-winner/$(channel))` | Moderator |

## Example usage

| Usage | Example | Description |
| ----- | ------- | ----------- |
| `!join-giveaway <contest-name>` | !join-giveaway our-awesome-contest` | This command registers your channel to the contest with the supplied name.  Every chat that uses this command with the same name will allow their chatters to enter the contest. |
| `!join` | `!join` | Chatters can use this command to join the contest.  It is not recommend to change this command name as the response from !join-giveaway will prompt your users to use this command. |
| `!multi-winner` | `!multi-winner` | This will pick a single user from all users in all chats that have used the !join command and end the contest, preventing any new users from joining. |
| `!multi-new-winner` | `!multi-new-winner` | Something happen and the winning user is not available or eligible to claim the prize, use this command to remove the current user from registerd users and pick a new winner. |
