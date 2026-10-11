// GENERATED FILE - do not edit.
// Source: API-Bank test data (MIT), HuggingFace dataset liminghao1630/API-Bank,
// revision 12e8158b7628c168f07e8f31fbbe3445e99f44cf, test-data/ members:
//   data/level-1-api.json sha256 0d3155c5495399836b5b1f1cc4eb6d5d50efa16b2734af50a016a158e9dd79bb
//   data/level-2-api.json sha256 c61966448d9d5cf98334f39b44c0db1fe5a9c6c84a1f53e652f4aacdbbfc5da0
//   data/level-3.json sha256 29542493a302915303d5d67f868282ddda46fa15ba059a4bcf38c6687be29d55
// Regenerate: npm run build:dataset

import type { ApiDef, ApiScenario } from "../types";

/** API definitions, deduplicated across the levels by API name. */
export const API_DEFS: Record<string, ApiDef> = {
  "AccountInfo": {
    name: "AccountInfo",
    description: "API for retrieving and updating user account information.",
    parameters: {
      "username": { type: "str", description: "Name of the user." },
      "password": { type: "str", description: "Password of the user." },
    },
    outputs: {
      "status": { type: "str", description: "success or failed" },
      "account_info": { type: "dict", description: "User account information" },
    }
  },
  "AddAgenda": {
    name: "AddAgenda",
    description: "The API for adding a agenda item includes content, time and location.",
    parameters: {
      "token": { type: "str", description: "User's token." },
      "content": { type: "str", description: "The content of the agenda." },
      "time": { type: "str", description: "The time for agenda. Format: %Y-%m-%d %H:%M:%S" },
      "location": { type: "str", description: "The location of the agenda." },
    },
    outputs: {
      "status": { type: "str", description: "success or failed" },
    }
  },
  "AddAlarm": {
    name: "AddAlarm",
    description: "The API for setting an alarm includes a parameter for the alarm time.",
    parameters: {
      "token": { type: "str", description: "User's token." },
      "time": { type: "str", description: "The time for alarm. Format: %Y-%m-%d %H:%M:%S" },
    },
    outputs: {
      "status": { type: "str", description: "success or failed" },
    }
  },
  "AddMeeting": {
    name: "AddMeeting",
    description: "This API allows users to make a reservation for a meeting and store the meeting information (e.g., topic, time, location, attendees) in the database.",
    parameters: {
      "token": { type: "str", description: "User's token." },
      "meeting_topic": { type: "str", description: "The title of the meeting, no more than 50 characters." },
      "start_time": { type: "str", description: "The start time of the meeting, in the pattern of %Y-%m-%d %H:%M:%S" },
      "end_time": { type: "str", description: "The end time of the meeting, in the pattern of %Y-%m-%d %H:%M:%S" },
      "location": { type: "str", description: "The location where the meeting to be held, no more than 100 characters." },
      "attendees": { type: "list(str)", description: "The attendees of the meeting, including names, positions and other information." },
    },
    outputs: {
      "status": { type: "str", description: "success or failed" },
    }
  },
  "AddReminder": {
    name: "AddReminder",
    description: "The API for adding a reminder item includes content and time.",
    parameters: {
      "token": { type: "str", description: "User's token." },
      "content": { type: "str", description: "The content of the conference." },
      "time": { type: "str", description: "The time for conference. Format: %Y-%m-%d %H:%M:%S" },
    },
    outputs: {
      "status": { type: "str", description: "success or failed" },
    }
  },
  "AppointmentRegistration": {
    name: "AppointmentRegistration",
    description: "This API registers an appointment of hospital.",
    parameters: {
      "patient_name": { type: "str", description: "The name of patient." },
      "date": { type: "str", description: "The date of appointment. Format be like %Y-%m-%d" },
      "doctor_name": { type: "str", description: "The name of appointed doctor." },
    },
    outputs: {
      "appointment_id": { type: "str", description: "The ID of appointment." },
    }
  },
  "BookHotel": {
    name: "BookHotel",
    description: "This API orders a hotel room. Two rooms are ordered if the number of adults is greater than 2. Only one order can be made at same time.",
    parameters: {
      "hotel_name": { type: "str", description: "The name of the hotel." },
      "check_in_time": { type: "str", description: "The time to check in. Format: %Y-%m-%d" },
      "check_out_time": { type: "str", description: "The time to check out. Format: %Y-%m-%d" },
      "room_count": { type: "int", description: "The number of rooms to order." },
      "adult_count": { type: "int", description: "The number of adults." },
      "child_count": { type: "int", description: "The number of children." },
    },
    outputs: {
      "order_id": { type: "str", description: "The ID of the order." },
    }
  },
  "Calculator": {
    name: "Calculator",
    description: "This API provides basic arithmetic operations: addition, subtraction, multiplication, and division.",
    parameters: {
      "formula": { type: "str", description: "The formula that needs to be calculated. Only integers are supported. Valid operators are +, -, *, /, and (, ). For example, '(1 + 2) * 3'." },
    },
    outputs: {
      "result": { type: "float", description: "The result of the formula." },
    }
  },
  "CancelRegistration": {
    name: "CancelRegistration",
    description: "This API cancels the registration of a patient given appointment ID.",
    parameters: {
      "appointment_id": { type: "str", description: "The ID of appointment." },
    },
    outputs: {
      "status": { type: "str", description: "The status of cancellation." },
    }
  },
  "CancelTimedSwitch": {
    name: "CancelTimedSwitch",
    description: "Cancels a timed switch for a smart device.",
    parameters: {
      "name": { type: "str", description: "The name of the smart device." },
      "time": { type: "str", description: "The time to switch the device on or off. Format: %Y-%m-%d %H:%M:%S" },
    },
    outputs: {
      "status": { type: "str", description: "Whether the time switch is successful." },
    }
  },
  "ClothingRecommendation": {
    name: "ClothingRecommendation",
    description: "API for providing clothing recommendations based on weather conditions.",
    parameters: {
      "temperature": { type: "float", description: "Temperature in Celsius." },
      "humidity": { type: "float", description: "Relative humidity in percentage." },
      "weather_conditions": { type: "str", description: "Description of weather conditions." },
    },
    outputs: {
      "clothing_options": { type: "list", description: "List of recommended clothing options." },
    }
  },
  "DeleteAccount": {
    name: "DeleteAccount",
    description: "Delete an account.",
    parameters: {
      "token": { type: "str", description: "The token of the user." },
    },
    outputs: {
      "status": { type: "str", description: "success or failed" },
    }
  },
  "DeleteAgenda": {
    name: "DeleteAgenda",
    description: "The API for deleting a schedule item includes parameters for token, content, time, and location.",
    parameters: {
      "token": { type: "str", description: "User's token." },
      "content": { type: "str", description: "The content of the agenda." },
      "time": { type: "str", description: "The time for agenda. Format: %Y-%m-%d %H:%M:%S" },
      "location": { type: "str", description: "The location of the agenda." },
    },
    outputs: {
      "status": { type: "str", description: "success or failed" },
    }
  },
  "DeleteAlarm": {
    name: "DeleteAlarm",
    description: "The API for removing an alarm includes a parameter for the time.",
    parameters: {
      "token": { type: "str", description: "User's token." },
      "time": { type: "str", description: "The time for alarm. Format: %Y-%m-%d %H:%M:%S" },
    },
    outputs: {
      "status": { type: "str", description: "success or failed" },
    }
  },
  "DeleteMeeting": {
    name: "DeleteMeeting",
    description: "This API allows users to delete a reservation for a meeting and remove the meeting information in the database.",
    parameters: {
      "token": { type: "str", description: "User's token." },
      "meeting_topic": { type: "str", description: "The title of the meeting, no more than 50 characters." },
      "start_time": { type: "str", description: "The start time of the meeting, in the pattern of %Y-%m-%d %H:%M:%S" },
      "end_time": { type: "str", description: "The end time of the meeting, in the pattern of %Y-%m-%d %H:%M:%S" },
      "location": { type: "str", description: "The location where the meeting to be held, no more than 100 characters." },
      "attendees": { type: "list(str)", description: "The attendees of the meeting, including names, positions and other information." },
    },
    outputs: {
      "status": { type: "str", description: "success or failed" },
    }
  },
  "DeleteReminder": {
    name: "DeleteReminder",
    description: "The API for deleting a reminder item includes content and time.",
    parameters: {
      "token": { type: "str", description: "User's token." },
      "content": { type: "str", description: "The content of the conference." },
      "time": { type: "str", description: "The time for conference. Format: %Y-%m-%d %H:%M:%S" },
    },
    outputs: {
      "status": { type: "str", description: "success or failed" },
    }
  },
  "DeleteScene": {
    name: "DeleteScene",
    description: "This API deletes a scene by its name.",
    parameters: {
      "name": { type: "str", description: "The name of the scene." },
    },
    outputs: {
      "status": { type: "str", description: "Whether the deletion is successful." },
    }
  },
  "Dictionary": {
    name: "Dictionary",
    description: "This API searches the dictionary for a given keyword.",
    parameters: {
      "keyword": { type: "str", description: "The keyword to search." },
    },
    outputs: {
      "results": { type: "list", description: "The list of results. Format be like [{\"partOfSpeech\": \"xxx\", \"definitions\": [{\"definition\": \"xxx\", \"example\": \"xxx\", \"synonyms\": [\"xxx\", \"xxx\"]}, ...]" },
    }
  },
  "DocumentQA": {
    name: "DocumentQA",
    description: "This API answers the question from a given document url.",
    parameters: {
      "url": { type: "str", description: "The url to download the document. It should end with .txt." },
      "question": { type: "str", description: "The question to be answered." },
    },
    outputs: {
      "answer": { type: "str", description: "The answer to the question." },
    }
  },
  "EmailReminder": {
    name: "EmailReminder",
    description: "This API sends an email reminder to the user with the meeting details.",
    parameters: {
      "content": { type: "str", description: "The content of the email." },
      "time": { type: "str", description: "The time for the meeting. Format: %Y-%m-%d %H:%M:%S" },
      "location": { type: "str", description: "The location of the meeting." },
      "recipient": { type: "str", description: "The email address of the recipient." },
    },
    outputs: {
      "status": { type: "str", description: "success or failed" },
    }
  },
  "EmergencyKnowledge": {
    name: "EmergencyKnowledge",
    description: "This API searches for a given symptom for emergency knowledge.",
    parameters: {
      "symptom": { type: "str", description: "The symptom to search." },
    },
    outputs: {
      "results": { type: "list", description: "The list of results. Format be like [{\"name\":possible disease name, \"aid\": first-aid method},...]" },
    }
  },
  "FlightSearch": {
    name: "FlightSearch",
    description: "API to retrieve flight options based on the destination and travel dates.",
    parameters: {
      "source": { type: "str", description: "Source for the flight." },
      "destination": { type: "str", description: "Destination for the flight." },
      "travel_dates": { type: "str", description: "Travel dates. Format: %Y-%m-%d" },
    },
    outputs: {
      "flights": { type: "list", description: "List of available flight options." },
    }
  },
  "ForgotPassword": {
    name: "ForgotPassword",
    description: "Sends an email to the user with a link to reset the password. Need call twice, first with 'Forgot Password' status to get the verification code, then call again with 'Verification Code' status to change the password. Must pass the name of the parameters when calling the API, like ForgotPassword(status='Forgot Password', username='username').",
    parameters: {
      "status": { type: "str", description: "'Forgot Password' for first call, after get the verification code, call again with 'Verification Code' to change the password." },
      "username": { type: "str", description: "The username of the user. Only needed for the first call." },
      "email": { type: "str", description: "The email of the user. Only needed for the first call." },
      "verification_code": { type: "int", description: "The verification code sent to the user. Only needed for the second call." },
      "new_password": { type: "str", description: "The new password of the user. Only needed for the second call." },
    },
    outputs: {
      "status": { type: "str", description: "success or failed" },
    }
  },
  "Geocoding": {
    name: "Geocoding",
    description: "The API for converting an address or place name to geographical coordinates.",
    parameters: {
      "address": { type: "str", description: "The address or place name to be converted." },
    },
    outputs: {
      "latitude": { type: "float", description: "The latitude of the location." },
      "longitude": { type: "float", description: "The longitude of the location." },
    }
  },
  "GetOccupationSalary": {
    name: "GetOccupationSalary",
    description: "API for querying the salary of a given occupation.",
    parameters: {
      "occupation": { type: "str", description: "The occupation to query." },
    },
    outputs: {
      "salary": { type: "float", description: "The salary of the given occupation." },
    }
  },
  "GetToday": {
    name: "GetToday",
    description: "This API gets the current date.",
    parameters: {
    },
    outputs: {
      "date": { type: "str", description: "The current date. Format: %Y-%m-%d" },
    }
  },
  "GetUserToken": {
    name: "GetUserToken",
    description: "Get the user token by username and password.",
    parameters: {
      "username": { type: "str", description: "The username of the user." },
      "password": { type: "str", description: "The password of the user." },
    },
    outputs: {
      "token": { type: "str", description: "The token of the user." },
    }
  },
  "GetWeatherForCoordinates": {
    name: "GetWeatherForCoordinates",
    description: "Retrieves current weather information based on the provided coordinates.",
    parameters: {
      "latitude": { type: "float", description: "Latitude of the location." },
      "longitude": { type: "float", description: "Longitude of the location." },
    },
    outputs: {
      "temperature": { type: "float", description: "Current temperature in Celsius." },
      "humidity": { type: "float", description: "Current humidity level." },
      "description": { type: "str", description: "Weather description." },
    }
  },
  "HotelAvailability": {
    name: "HotelAvailability",
    description: "API for checking hotel availability based on the destination and travel dates.",
    parameters: {
      "destination": { type: "str", description: "Destination for hotel search." },
      "check_in_date": { type: "str", description: "Check-in date. Format: %Y-%m-%d" },
      "check_out_date": { type: "str", description: "Check-out date. Format: %Y-%m-%d" },
    },
    outputs: {
      "hotels": { type: "list", description: "List of available hotels." },
    }
  },
  "ImageCaption": {
    name: "ImageCaption",
    description: "This API generates a caption for a given image.",
    parameters: {
      "url": { type: "str", description: "The url to download the image. It should end with .jpg, .jpeg or .png." },
    },
    outputs: {
      "caption": { type: "str", description: "The generated caption." },
    }
  },
  "LikeCount": {
    name: "LikeCount",
    description: "API to retrieve the number of likes for a given post ID.",
    parameters: {
      "post_id": { type: "int", description: "Post ID." },
    },
    outputs: {
      "like_count": { type: "int", description: "Number of likes for the post." },
    }
  },
  "ModifyAgenda": {
    name: "ModifyAgenda",
    description: "The API for modifying a schedule item includes parameters for content, time, and location.",
    parameters: {
      "token": { type: "str", description: "User's token." },
      "content": { type: "str", description: "The content of the agenda." },
      "time": { type: "str", description: "The new time for agenda. Format: %Y-%m-%d %H:%M:%S" },
      "location": { type: "str", description: "The new location of the agenda." },
    },
    outputs: {
      "status": { type: "str", description: "success or failed" },
    }
  },
  "ModifyAlarm": {
    name: "ModifyAlarm",
    description: "The API for modifying an alarm includes a parameter for the from_time to to_time.",
    parameters: {
      "token": { type: "str", description: "User's token." },
      "from_time": { type: "str", description: "The time for alarm which changed from. Format: %Y-%m-%d %H:%M:%S" },
      "to_time": { type: "str", description: "The time for alarm which changed to. Format: %Y-%m-%d %H:%M:%S" },
    },
    outputs: {
      "status": { type: "str", description: "success or failed" },
    }
  },
  "ModifyMeeting": {
    name: "ModifyMeeting",
    description: "This API allows users to modify a reservation for a meeting",
    parameters: {
      "token": { type: "str", description: "User's token." },
      "meeting_topic": { type: "str", description: "The title of the meeting, no more than 50 characters." },
      "start_time": { type: "str", description: "The start time of the meeting, in the pattern of %Y-%m-%d %H:%M:%S" },
      "end_time": { type: "str", description: "The end time of the meeting, in the pattern of %Y-%m-%d %H:%M:%S" },
      "location": { type: "str", description: "The location where the meeting to be held, no more than 100 characters." },
      "attendees": { type: "list(str)", description: "The attendees of the meeting, including names, positions and other information." },
    },
    outputs: {
      "status": { type: "str", description: "success or failed" },
    }
  },
  "ModifyPassword": {
    name: "ModifyPassword",
    description: "The API for modifying the password of the account.",
    parameters: {
      "token": { type: "str", description: "The token of the user." },
      "old_password": { type: "str", description: "The old password of the user." },
      "new_password": { type: "str", description: "The new password of the user." },
    },
    outputs: {
      "status": { type: "str", description: "success or failed" },
    }
  },
  "ModifyRegistration": {
    name: "ModifyRegistration",
    description: "This API modifies the registration of a patient given appointment ID.",
    parameters: {
      "appointment_id": { type: "str", description: "The ID of appointment." },
      "new_appointment_date": { type: "str", description: "The new appointment date. Format: %Y-%m-%d." },
      "new_appointment_doctor": { type: "str", description: "The new appointment doctor." },
    },
    outputs: {
      "status": { type: "str", description: "The status of modification." },
    }
  },
  "ModifyReminder": {
    name: "ModifyReminder",
    description: "The API for deleting a reminder item includes content and time.",
    parameters: {
      "token": { type: "str", description: "User's token." },
      "content": { type: "str", description: "The content of the conference." },
      "time": { type: "str", description: "The time for conference. Format: %Y-%m-%d %H:%M:%S" },
    },
    outputs: {
      "status": { type: "str", description: "success or failed" },
    }
  },
  "MovieRecommendations": {
    name: "MovieRecommendations",
    description: "The API for retrieving recommended movies based on user preferences and filtering watched movies.",
    parameters: {
      "preferences": { type: "list", description: "User's movie preferences." },
    },
    outputs: {
      "recommended_movies": { type: "list", description: "List of recommended movies." },
    }
  },
  "NearbyRestaurants": {
    name: "NearbyRestaurants",
    description: "Retrieves nearby restaurants based on the provided coordinates and search parameters.",
    parameters: {
      "latitude": { type: "float", description: "Latitude of the location." },
      "longitude": { type: "float", description: "Longitude of the location." },
      "distance": { type: "int", description: "The distance in meters from the location to search for restaurants." },
    },
    outputs: {
      "restaurants": { type: "list", description: "A list of nearby restaurants." },
    }
  },
  "OpenBankAccount": {
    name: "OpenBankAccount",
    description: "This is an API for opening a bank account for a user, given the account, password and name.",
    parameters: {
      "account": { type: "str", description: "The account for the user." },
      "password": { type: "str", description: "The password." },
      "name": { type: "str", description: "account holder name." },
    },
    outputs: {
      "status": { type: "str", description: "success or failed" },
    }
  },
  "OrganizationMembers": {
    name: "OrganizationMembers",
    description: "API to retrieve the list of members in the organization.",
    parameters: {
      "organization": { type: "str", description: "Name of the organization." },
    },
    outputs: {
      "members": { type: "list", description: "List of organization members." },
    }
  },
  "PersonalInfoUpdate": {
    name: "PersonalInfoUpdate",
    description: "The API for updating a user's personal information and address.",
    parameters: {
      "username": { type: "str", description: "Name of the user." },
      "password": { type: "str", description: "Password of the user." },
      "address": { type: "str", description: "Updated address information." },
    },
    outputs: {
      "status": { type: "str", description: "Success or failure" },
    }
  },
  "PlayMusic": {
    name: "PlayMusic",
    description: "This API triggers a music player to play music.",
    parameters: {
      "music_name": { type: "str", description: "The name of the music to play." },
    },
    outputs: {
      "status": { type: "str", description: "The corresponding url scheme to trigger the music player." },
    }
  },
  "QueryAgenda": {
    name: "QueryAgenda",
    description: "The API for getting a schedule item includes parameters for token, content, time, and location.",
    parameters: {
      "token": { type: "str", description: "User's token." },
      "content": { type: "str", description: "The content of the agenda." },
      "time": { type: "str", description: "The time for agenda. Format: %Y-%m-%d %H:%M:%S" },
      "location": { type: "str", description: "The location of the agenda." },
    },
    outputs: {
      "info": { type: "json", description: "agenda info including username and time" },
    }
  },
  "QueryAlarm": {
    name: "QueryAlarm",
    description: "The API for querying alarm clock, help user to check the alarm clock they have set.",
    parameters: {
      "token": { type: "str", description: "User's token." },
      "time": { type: "str", description: "The time for alarm. Format: %Y-%m-%d %H:%M:%S" },
    },
    outputs: {
      "info": { type: "json", description: "alarm info including username, time, content and location" },
    }
  },
  "QueryBalance": {
    name: "QueryBalance",
    description: "This API queries the balance of a given user.",
    parameters: {
      "token": { type: "str", description: "The token of the user." },
    },
    outputs: {
      "balance": { type: "float", description: "The balance of the user." },
    }
  },
  "QueryHealthData": {
    name: "QueryHealthData",
    description: "This API queries the recorded health data in database of a given user and time span.",
    parameters: {
      "user_id": { type: "str", description: "The user id of the given user. Cases are ignored." },
      "start_time": { type: "str", description: "The start time of the time span. Format: %Y-%m-%d %H:%M:%S" },
      "end_time": { type: "str", description: "The end time of the time span. Format: %Y-%m-%d %H:%M:%S" },
    },
    outputs: {
      "health_data": { type: "list", description: "The health data of the given user and time span." },
    }
  },
  "QueryHistoryToday": {
    name: "QueryHistoryToday",
    description: "This API queries the history of the given date.",
    parameters: {
      "date": { type: "str", description: "The date of the history. Format: %m-%d" },
    },
    outputs: {
      "history": { type: "list", description: "The history of the user today." },
    }
  },
  "QueryMeeting": {
    name: "QueryMeeting",
    description: "This API allows users to query the information of a meeting.",
    parameters: {
      "token": { type: "str", description: "User's token." },
      "meeting_topic": { type: "str", description: "The title of the meeting, no more than 50 characters." },
      "start_time": { type: "str", description: "The start time of the meeting, in the pattern of %Y-%m-%d %H:%M:%S" },
      "end_time": { type: "str", description: "The end time of the meeting, in the pattern of %Y-%m-%d %H:%M:%S" },
      "location": { type: "str", description: "The location where the meeting to be held, no more than 100 characters." },
      "attendees": { type: "list(str)", description: "The attendees of the meeting, including names, positions and other information." },
    },
    outputs: {
      "meeting_info": { type: "json", description: "meeting info" },
    }
  },
  "QueryRegistration": {
    name: "QueryRegistration",
    description: "This API queries the registration of a patient, given patient ID.",
    parameters: {
      "patient_name": { type: "str", description: "The name of patient." },
      "date": { type: "str", description: "The date of appointment. Format be like %Y-%m-%d" },
    },
    outputs: {
      "appointments": { type: "list", description: "The dict where from appointment_id to a list like [\"patient_name\":xxx, \"date\":xxx, \"doctor_name\":xxx]" },
    }
  },
  "QueryReminder": {
    name: "QueryReminder",
    description: "The API for querying a reminder item includes content and time.",
    parameters: {
      "token": { type: "str", description: "User's token." },
      "content": { type: "str", description: "The content of the reminder." },
      "time": { type: "str", description: "The time for the reminder. Format: %Y-%m-%d %H:%M:%S" },
    },
    outputs: {
      "reminder_info": { type: "json", description: "remind info" },
    }
  },
  "QueryScene": {
    name: "QueryScene",
    description: "This API queries a scene of smart home system, given the scene name",
    parameters: {
      "name": { type: "str", description: "The name of the scene." },
    },
    outputs: {
      "devices": { type: "list", description: "The list of smart devices, containing the name and description." },
    }
  },
  "QueryStock": {
    name: "QueryStock",
    description: "This API queries the stock price of a given stock code and date.",
    parameters: {
      "stock_code": { type: "str", description: "The stock code of the given stock." },
      "date": { type: "str", description: "The date of the stock price. Format: %Y-%m-%d" },
    },
    outputs: {
      "stock_price": { type: "float", description: "The stock price of the given stock." },
    }
  },
  "RecordHealthData": {
    name: "RecordHealthData",
    description: "This API records the health data of a user.",
    parameters: {
      "user_id": { type: "str", description: "The ID of user." },
      "time": { type: "str", description: "The time of health data. Format: %Y-%m-%d %H:%M:%S" },
      "health_data": { type: "list", description: "The health data, with the format like [{'name': 'blood_pressure', 'value': '120/80'}, {'name': 'heart_rate', 'value': '80'}]" },
    },
    outputs: {
      "status": { type: "str", description: "The status of recording." },
    }
  },
  "RegisterUser": {
    name: "RegisterUser",
    description: "The API for registering a account, given the username, password and email.",
    parameters: {
      "username": { type: "str", description: "The username of the user." },
      "password": { type: "str", description: "The password of the user." },
      "email": { type: "str", description: "The email of the user." },
    },
    outputs: {
      "token": { type: "str", description: "The token of the user." },
    }
  },
  "SearchEngine": {
    name: "SearchEngine",
    description: "This API searches for a given keyword for search engine.",
    parameters: {
      "keyword": { type: "str", description: "The keyword to search." },
    },
    outputs: {
      "results": { type: "list", description: "The list of results." },
    }
  },
  "SendEmail": {
    name: "SendEmail",
    description: "This API for sending email, given the receiver, subject and content.",
    parameters: {
      "receiver": { type: "str", description: "The receiver address of the email." },
      "subject": { type: "str", description: "The subject address of the email." },
      "content": { type: "str", description: "The content of the email." },
    },
    outputs: {
      "status": { type: "str", description: "The status of the email." },
    }
  },
  "SpeechRecognition": {
    name: "SpeechRecognition",
    description: "This API recognizes the speech from a given audio url.",
    parameters: {
      "url": { type: "str", description: "The url to download the audio. It should end with .wav." },
    },
    outputs: {
      "transcript": { type: "str", description: "The transcript of the audio." },
    }
  },
  "SymptomSearch": {
    name: "SymptomSearch",
    description: "This API searches for a given symptom.",
    parameters: {
      "symptom": { type: "str", description: "The symptom to search." },
    },
    outputs: {
      "results": { type: "list", description: "The list of results. Format be like [{\"name\":possible disease name, \"description\": disease details},...]" },
    }
  },
  "TaxCalculator": {
    name: "TaxCalculator",
    description: "API for calculating tax deductions based on the given salary.",
    parameters: {
      "salary": { type: "float", description: "The salary to calculate tax deductions for." },
    },
    outputs: {
      "salary_after_tax": { type: "float", description: "The salary after tax deductions." },
    }
  },
  "TimedSwitch": {
    name: "TimedSwitch",
    description: "This API for setting a timed switch for a smart device.",
    parameters: {
      "name": { type: "str", description: "The name of the smart device." },
      "time": { type: "str", description: "The time to switch the device on or off. Format: %Y-%m-%d %H:%M:%S" },
      "on": { type: "bool", description: "Whether to switch the device on or off." },
    },
    outputs: {
      "status": { type: "str", description: "Whether the time switch is successful." },
    }
  },
  "ToolSearcher": {
    name: "ToolSearcher",
    description: "Searches for relevant tools in library based on the keywords.",
    parameters: {
      "keywords": { type: "str", description: "The keyword to search for." },
    },
    outputs: {
      "best_matchs": { type: "Union[List[dict], dict]", description: "The best match tool(s)." },
    }
  },
  "Translate": {
    name: "Translate",
    description: "The API for translating text from source language to target language.",
    parameters: {
      "src": { type: "str", description: "The text to be translated." },
      "src_lang": { type: "str", description: "[Optional] The source language to translate from. Default is auto." },
      "tgt_lang": { type: "str", description: "[Optional] The target language to translate to. Default is english/en." },
    },
    outputs: {
      "translated_text": { type: "str", description: "The translated text." },
    }
  },
  "TravelStatus": {
    name: "TravelStatus",
    description: "API for retrieving the current travel status of each member.",
    parameters: {
      "member_name": { type: "str", description: "Name of the member." },
    },
    outputs: {
      "status": { type: "str", description: "Travel status" },
    }
  },
  "UserMoviePreferences": {
    name: "UserMoviePreferences",
    description: "API for retrieving user preferences for movie recommendations.",
    parameters: {
      "user_name": { type: "str", description: "Name of the user." },
    },
    outputs: {
      "preferences": { type: "list", description: "List of movie preferences." },
    }
  },
  "UserPosts": {
    name: "UserPosts",
    description: "API to retrieve the post IDs for a specific user.",
    parameters: {
      "user_id": { type: "int", description: "User's ID." },
    },
    outputs: {
      "post_ids": { type: "list", description: "List of post IDs." },
    }
  },
  "UserWatchedMovies": {
    name: "UserWatchedMovies",
    description: "API for retrieving a user's watched movie list.",
    parameters: {
      "user_name": { type: "str", description: "Name of the user." },
    },
    outputs: {
      "watched_movies": { type: "list", description: "List of watched movies." },
    }
  },
  "Wiki": {
    name: "Wiki",
    description: "This API for searching a keyword in Wikipedia.",
    parameters: {
      "keyword": { type: "str", description: "The keyword to search." },
    },
    outputs: {
      "results": { type: "dict", description: "The list of results. Format be like {\"url\": \"xxx\", \"summary\": \"xxx\", \"content\": \"xxx\"}" },
    }
  },
};

/** Every API-Bank scenario, in level order. */
export const SCENARIOS: readonly ApiScenario[] = [
  {
    id: "L1/0",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you please modify my appointment scheduled for March 25th with Dr…",
    requirement: "Can you please modify my appointment scheduled for March 25th with Dr. Kim to March 26th with Dr. Lee?",
    task: "User: Can you please modify my appointment scheduled for March 25th with Dr. Kim to March 26th with Dr. Lee?\nAI: Sure, I can help you with that. Please provide me with the appointment ID and the new appointment date and doctor's name.\nUser: The appointment ID is 34567890 and the new date is March 26th with Dr. Lee.\nAI: Alright. I'll modify your appointment now.",
    toolNames: ["QueryHealthData", "CancelRegistration", "ModifyRegistration"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "ModifyRegistration", args: {"appointment_id":"34567890","new_appointment_date":"2023-03-26","new_appointment_doctor":"Dr. Lee"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/1",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you please modify my appointment scheduled for March 25th with Dr…",
    requirement: "Can you please modify my appointment scheduled for March 25th with Dr. Kim to March 26th with Dr. Lee?",
    task: "User: Can you please modify my appointment scheduled for March 25th with Dr. Kim to March 26th with Dr. Lee?\nAI: Sure, I can help you with that. Please provide me with the appointment ID and the new appointment date and doctor's name.\nUser: The appointment ID is 34567890 and the new date is March 26th with Dr. Lee.\nAI: Alright. I'll modify your appointment now.\nAI: Your appointment has been modified successfully.\nUser: Can you also check my health data for the past week?\nAI: Of course. To do that, I'll need your user ID and the start and end time of the time span you want to check.\nUser: My user ID is J46801 and I want to check from March 5th to March 12th.\nAI: Got it.",
    toolNames: ["QueryHealthData", "CancelRegistration", "ModifyRegistration"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "QueryHealthData", args: {"user_id":"J46801","start_time":"2023-03-05 00:00:00","end_time":"2023-03-12 00:00:00"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/2",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you please modify my appointment scheduled for March 25th with Dr…",
    requirement: "Can you please modify my appointment scheduled for March 25th with Dr. Kim to March 26th with Dr. Lee?",
    task: "User: Can you please modify my appointment scheduled for March 25th with Dr. Kim to March 26th with Dr. Lee?\nAI: Sure, I can help you with that. Please provide me with the appointment ID and the new appointment date and doctor's name.\nUser: The appointment ID is 34567890 and the new date is March 26th with Dr. Lee.\nAI: Alright. I'll modify your appointment now.\nAI: Your appointment has been modified successfully.\nUser: Can you also check my health data for the past week?\nAI: Of course. To do that, I'll need your user ID and the start and end time of the time span you want to check.\nUser: My user ID is J46801 and I want to check from March 5th to March 12th.\nAI: Got it.\nAI: Here are your health data for that period: [{\"time\": \"2023-03-11 14:20:00\", \"blood_pressure\": [140, 90], \"triglycerides\": 130, \"heart_rate\": 85}].\nUser: Actually, can you cancel the appointment instead of modifying it?\nAI: Sure thing. Please provide me the appointment ID, patient name, date, and doctor name.\nUser: The appointment ID is 90123456, the patient name is Olivia Davis, the date is October 10th, and the doctor name is Dr. Smith.\nAI: All right, canceling that appointment for you.",
    toolNames: ["QueryHealthData", "CancelRegistration", "ModifyRegistration"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "CancelRegistration", args: {"appointment_id":"90123456"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/3",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you calculate (5+6)*3 for me?",
    requirement: "Can you calculate (5+6)*3 for me?",
    task: "User: Can you calculate (5+6)*3 for me?\nAI: Sure, let me handle that.",
    toolNames: ["Calculator"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "Calculator", args: {"formula":"(5+6)*3"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/4",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you tell me about the devices included in the Morning Routine sce…",
    requirement: "Can you tell me about the devices included in the Morning Routine scene?",
    task: "User: Can you tell me about the devices included in the Morning Routine scene?\nAI: Sure, what is the name of the scene you want to know about?\nUser: Morning Routine",
    toolNames: ["QueryScene"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "QueryScene", args: {"name":"Morning Routine"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/5",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me find out about shortness of breath?",
    requirement: "Can you help me find out about shortness of breath?",
    task: "User: Can you help me find out about shortness of breath?\nAI: Sure, I can call the EmergencyKnowledge API to search for information about shortness of breath.",
    toolNames: ["EmergencyKnowledge", "RecordHealthData", "ModifyRegistration"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "EmergencyKnowledge", args: {"symptom":"shortness of breath"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/6",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me find out about shortness of breath?",
    requirement: "Can you help me find out about shortness of breath?",
    task: "User: Can you help me find out about shortness of breath?\nAI: Sure, I can call the EmergencyKnowledge API to search for information about shortness of breath.\nAI: Here are some possible diseases related to shortness of breath: Asthma and Pneumonia. Would you like me to provide more information?\nUser: Yes, please.\nAI: For Asthma, it is a chronic respiratory condition characterized by inflammation and narrowing of the airways, leading to shortness of breath, wheezing, and coughing. Treatment may involve inhalers or nebulizers to open the airways, as well as medications to manage inflammation and prevent attacks. For Pneumonia, it is an infection of the lungs that can cause fever, cough, shortness of breath, and other symptoms. Treatment may involve antibiotics, rest, and fluids to help the body fight the infection and recover.\nUser: Thank you for your help. Can you modify my appointment with Dr. Smith on October 10th to October 15th with Dr. Johnson?\nAI: Sure, I can call the ModifyRegistration API to modify your appointment. May I know your appointment ID, please?\nUser: It's 90123456.\nAI: Thank you. To verify, you want to change it to October 15th with Dr. Johnson, correct?\nUser: Yes.",
    toolNames: ["EmergencyKnowledge", "RecordHealthData", "ModifyRegistration"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "ModifyRegistration", args: {"appointment_id":"90123456","new_appointment_date":"2023-10-15","new_appointment_doctor":"Dr. Johnson"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/7",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me find out about shortness of breath?",
    requirement: "Can you help me find out about shortness of breath?",
    task: "User: Can you help me find out about shortness of breath?\nAI: Sure, I can call the EmergencyKnowledge API to search for information about shortness of breath.\nAI: Here are some possible diseases related to shortness of breath: Asthma and Pneumonia. Would you like me to provide more information?\nUser: Yes, please.\nAI: For Asthma, it is a chronic respiratory condition characterized by inflammation and narrowing of the airways, leading to shortness of breath, wheezing, and coughing. Treatment may involve inhalers or nebulizers to open the airways, as well as medications to manage inflammation and prevent attacks. For Pneumonia, it is an infection of the lungs that can cause fever, cough, shortness of breath, and other symptoms. Treatment may involve antibiotics, rest, and fluids to help the body fight the infection and recover.\nUser: Thank you for your help. Can you modify my appointment with Dr. Smith on October 10th to October 15th with Dr. Johnson?\nAI: Sure, I can call the ModifyRegistration API to modify your appointment. May I know your appointment ID, please?\nUser: It's 90123456.\nAI: Thank you. To verify, you want to change it to October 15th with Dr. Johnson, correct?\nUser: Yes.\nAI: Okay, your appointment has been successfully modified.\nUser: Can you record my blood pressure and heart rate?\nAI: Yes. To proceed, I need your user ID, please.\nUser: My user ID is 12345.\nAI: Thank you. May I know the time of the health data you want to record, and the values of blood pressure and heart rate?\nUser: Sure, the time is 2023-10-13 09:30:00, my blood pressure is 120/80, and my heart rate is 80.",
    toolNames: ["EmergencyKnowledge", "RecordHealthData", "ModifyRegistration"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "RecordHealthData", args: {"user_id":"12345","time":"2023-10-13 09:30:00","health_data":"[{"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/8",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me find possible diseases related to fatigue?",
    requirement: "Can you help me find possible diseases related to fatigue?",
    task: "User: Can you help me find possible diseases related to fatigue?\nAI: Sure, I can search for possible diseases related to fatigue. Please provide the symptom you want to search for.\nUser: Fatigue.\nAI: I understand. Here are some possible diseases related to fatigue: Chronic fatigue syndrome, Anemia, and Depression. Would you like me to provide more information about any of these diseases?",
    toolNames: ["SymptomSearch", "AppointmentRegistration"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "SymptomSearch", args: {"symptom":"fatigue"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/9",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me find possible diseases related to fatigue?",
    requirement: "Can you help me find possible diseases related to fatigue?",
    task: "User: Can you help me find possible diseases related to fatigue?\nAI: Sure, I can search for possible diseases related to fatigue. Please provide the symptom you want to search for.\nUser: Fatigue.\nAI: I understand. Here are some possible diseases related to fatigue: Chronic fatigue syndrome, Anemia, and Depression. Would you like me to provide more information about any of these diseases?\nUser: Yes, please tell me more about Chronic fatigue syndrome.\nAI: Chronic fatigue syndrome is a debilitating condition characterized by persistent fatigue that is not relieved by rest and is not due to another underlying medical condition. Treatment may involve a combination of medications, lifestyle changes, and cognitive-behavioral therapy to manage symptoms.",
    toolNames: ["SymptomSearch", "AppointmentRegistration"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "SymptomSearch", args: {"symptom":"fatigue"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/10",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me find possible diseases related to fatigue?",
    requirement: "Can you help me find possible diseases related to fatigue?",
    task: "User: Can you help me find possible diseases related to fatigue?\nAI: Sure, I can search for possible diseases related to fatigue. Please provide the symptom you want to search for.\nUser: Fatigue.\nAI: I understand. Here are some possible diseases related to fatigue: Chronic fatigue syndrome, Anemia, and Depression. Would you like me to provide more information about any of these diseases?\nUser: Yes, please tell me more about Chronic fatigue syndrome.\nAI: Chronic fatigue syndrome is a debilitating condition characterized by persistent fatigue that is not relieved by rest and is not due to another underlying medical condition. Treatment may involve a combination of medications, lifestyle changes, and cognitive-behavioral therapy to manage symptoms.\nUser: Can you help me book an appointment with Dr. John on 2023-10-15?\nAI: I can definitely help you with that. Please provide your full name to register the appointment with Dr. John on 2023-10-15.\nUser: My name is Emily Smith.",
    toolNames: ["SymptomSearch", "AppointmentRegistration"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "AppointmentRegistration", args: {"patient_name":"Emily Smith","date":"2023-10-15","doctor_name":"Dr. John"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/11",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me reschedule my appointment with Dr. Smith on April 12t…",
    requirement: "Can you help me reschedule my appointment with Dr. Smith on April 12th, 2023?",
    task: "User: Can you help me reschedule my appointment with Dr. Smith on April 12th, 2023?\nAI: Sure, please provide me with your appointment ID.\nUser: It's 12345678.\nAI: Okay, and what is your new appointment date and doctor's name?\nUser: Can you please reschedule it to April 15th, 2023 with Dr. Johnson?",
    toolNames: ["EmergencyKnowledge", "ModifyRegistration"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "ModifyRegistration", args: {"appointment_id":"12345678","new_appointment_date":"2023-04-15","new_appointment_doctor":"Dr. Johnson"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/12",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me reschedule my appointment with Dr. Smith on April 12t…",
    requirement: "Can you help me reschedule my appointment with Dr. Smith on April 12th, 2023?",
    task: "User: Can you help me reschedule my appointment with Dr. Smith on April 12th, 2023?\nAI: Sure, please provide me with your appointment ID.\nUser: It's 12345678.\nAI: Okay, and what is your new appointment date and doctor's name?\nUser: Can you please reschedule it to April 15th, 2023 with Dr. Johnson?\nAI: Alright, I have successfully rescheduled your appointment with Dr. Johnson on April 15th, 2023.\nUser: I'm feeling really tired lately, can you give me some information on what might be causing it?\nAI: Sure, let me look up some information for you. What specific symptom are you experiencing?\nUser: Fatigue.",
    toolNames: ["EmergencyKnowledge", "ModifyRegistration"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "EmergencyKnowledge", args: {"symptom":"fatigue"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/13",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me reschedule my appointment with Dr. Smith on April 12t…",
    requirement: "Can you help me reschedule my appointment with Dr. Smith on April 12th, 2023?",
    task: "User: Can you help me reschedule my appointment with Dr. Smith on April 12th, 2023?\nAI: Sure, please provide me with your appointment ID.\nUser: It's 12345678.\nAI: Okay, and what is your new appointment date and doctor's name?\nUser: Can you please reschedule it to April 15th, 2023 with Dr. Johnson?\nAI: Alright, I have successfully rescheduled your appointment with Dr. Johnson on April 15th, 2023.\nUser: I'm feeling really tired lately, can you give me some information on what might be causing it?\nAI: Sure, let me look up some information for you. What specific symptom are you experiencing?\nUser: Fatigue.\nAI: I have found some possible causes for your fatigue. It can be due to Chronic fatigue syndrome, Anemia or Depression. Would you like me to provide you more information on each of these?\nUser: Yes please.",
    toolNames: ["EmergencyKnowledge", "ModifyRegistration"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "EmergencyKnowledge", args: {"symptom":"fatigue"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/14",
    level: 1,
    category: "Level 1 - single call",
    title: "Hi, can you help me delete my account?",
    requirement: "Hi, can you help me delete my account?",
    task: "User: Hi, can you help me delete my account?\nAI: Sure, I can help with that. I just need your authentication information. Can you please provide me with your username and password?\nUser: My email is foo and my password is bar.\nAI: Thanks for providing that information. Before we delete your account, I need to authenticate you. Retrieving user token...",
    toolNames: ["DeleteAccount", "GetUserToken"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "GetUserToken", args: {"username":"foo","password":"bar"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/15",
    level: 1,
    category: "Level 1 - single call",
    title: "Hi, can you help me delete my account?",
    requirement: "Hi, can you help me delete my account?",
    task: "User: Hi, can you help me delete my account?\nAI: Sure, I can help with that. I just need your authentication information. Can you please provide me with your username and password?\nUser: My email is foo and my password is bar.\nAI: Thanks for providing that information. Before we delete your account, I need to authenticate you. Retrieving user token...\nAI: Okay. Now, to delete your account, I just need the confirmation to delete it.\nUser: Yes, I want to delete it.",
    toolNames: ["DeleteAccount", "GetUserToken"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "DeleteAccount", args: {"token":"z9x8c7v6b5n4m3q2w1"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/16",
    level: 1,
    category: "Level 1 - single call",
    title: "Hi, can you help me check my alarm for March 20th, 2023 at 6:30AM?",
    requirement: "Hi, can you help me check my alarm for March 20th, 2023 at 6:30AM?",
    task: "User: Hi, can you help me check my alarm for March 20th, 2023 at 6:30AM?\nAI: Sure, to access your alarm information, I'll need to authenticate. Can you please provide me with your email, username, and password?\nUser: My email is janesmith@example.com, username is JaneSmith, and password is password.\nAI: Thank you for the information. Let me authenticate you first.",
    toolNames: ["GetUserToken", "QueryAlarm"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "GetUserToken", args: {"username":"JaneSmith","password":"password"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/17",
    level: 1,
    category: "Level 1 - single call",
    title: "Hi, can you help me check my alarm for March 20th, 2023 at 6:30AM?",
    requirement: "Hi, can you help me check my alarm for March 20th, 2023 at 6:30AM?",
    task: "User: Hi, can you help me check my alarm for March 20th, 2023 at 6:30AM?\nAI: Sure, to access your alarm information, I'll need to authenticate. Can you please provide me with your email, username, and password?\nUser: My email is janesmith@example.com, username is JaneSmith, and password is password.\nAI: Thank you for the information. Let me authenticate you first.\nAI: Okay, you are authenticated now. Checking your alarm information for March 20th, 2023 at 6:30AM.",
    toolNames: ["GetUserToken", "QueryAlarm"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "QueryAlarm", args: {"token":"o8i7u6y5t4r3e2w1q0","time":"2023-03-20 06:30:00"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/18",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me check a meeting on March 20th from 2pm to 4pm in Conf…",
    requirement: "Can you help me check a meeting on March 20th from 2pm to 4pm in Conference Room A with John Smith and Jane Doe?",
    task: "User: Can you help me check a meeting on March 20th from 2pm to 4pm in Conference Room A with John Smith and Jane Doe?\nAI: Sure, I can help with that. Do you have a meeting topic in mind?\nUser: Oh, yes. The meeting topic is Sales Meeting.\nAI: Great. To schedule the meeting, I need your username and password for authentication. Can you please provide that?\nUser: My username is JohnDoe and my password is pass123.\nAI: Thank you. Now, I need to get the user token for authentication.",
    toolNames: ["QueryMeeting", "GetUserToken"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "GetUserToken", args: {"username":"JohnDoe","password":"pass123"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/19",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me check a meeting on March 20th from 2pm to 4pm in Conf…",
    requirement: "Can you help me check a meeting on March 20th from 2pm to 4pm in Conference Room A with John Smith and Jane Doe?",
    task: "User: Can you help me check a meeting on March 20th from 2pm to 4pm in Conference Room A with John Smith and Jane Doe?\nAI: Sure, I can help with that. Do you have a meeting topic in mind?\nUser: Oh, yes. The meeting topic is Sales Meeting.\nAI: Great. To schedule the meeting, I need your username and password for authentication. Can you please provide that?\nUser: My username is JohnDoe and my password is pass123.\nAI: Thank you. Now, I need to get the user token for authentication.\nAI: Alright, I got the token. Now, I'll check your meeting.",
    toolNames: ["QueryMeeting", "GetUserToken"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "QueryMeeting", args: {"token":"a9s8d7f6g5h4j3k2l1","meeting_topic":"Sales Meeting","start_time":"2023-03-20 14:00:00","end_time":"2023-03-20 16:00:00","location":"Conference Room A","attendees":"["} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/20",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you add \"Meeting with clients\" on December 15, 2023 at 2:00 PM at…",
    requirement: "Can you add \"Meeting with clients\" on December 15, 2023 at 2:00 PM at ABC company in AddAgenda API?",
    task: "User: Can you add \"Meeting with clients\" on December 15, 2023 at 2:00 PM at ABC company in AddAgenda API?\nAI: Sure, let me add that to your agenda.",
    toolNames: ["GetUserToken", "AddAgenda"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "GetUserToken", args: {"username":"JohnDoe","password":"pass123"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/21",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you add \"Meeting with clients\" on December 15, 2023 at 2:00 PM at…",
    requirement: "Can you add \"Meeting with clients\" on December 15, 2023 at 2:00 PM at ABC company in AddAgenda API?",
    task: "User: Can you add \"Meeting with clients\" on December 15, 2023 at 2:00 PM at ABC company in AddAgenda API?\nAI: Sure, let me add that to your agenda.",
    toolNames: ["GetUserToken", "AddAgenda"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "AddAgenda", args: {"token":"a9s8d7f6g5h4j3k2l1","content":"Meeting with clients at ABC company","time":"2023-12-15 14:00:00","location":"ABC company"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/22",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you add \"Meeting with clients\" on December 15, 2023 at 2:00 PM at…",
    requirement: "Can you add \"Meeting with clients\" on December 15, 2023 at 2:00 PM at ABC company in AddAgenda API?",
    task: "User: Can you add \"Meeting with clients\" on December 15, 2023 at 2:00 PM at ABC company in AddAgenda API?\nAI: Sure, let me add that to your agenda.",
    toolNames: ["GetUserToken", "AddAgenda"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "AddAgenda", args: {"token":"a9s8d7f6g5h4j3k2l1","content":"Meeting with clients at ABC company","time":"2023-12-15 14:00:00","location":"ABC company"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/23",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you tell me the stock price of Amazon on March 12th, 2022?",
    requirement: "Can you tell me the stock price of Amazon on March 12th, 2022?",
    task: "User: Can you tell me the stock price of Amazon on March 12th, 2022?\nAI: Sure, let me check that for you.",
    toolNames: ["OpenBankAccount", "QueryStock", "QueryBalance", "GetUserToken"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "QueryStock", args: {"stock_code":"AMZN","date":"2022-03-12"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/24",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you tell me the stock price of Amazon on March 12th, 2022?",
    requirement: "Can you tell me the stock price of Amazon on March 12th, 2022?",
    task: "User: Can you tell me the stock price of Amazon on March 12th, 2022?\nAI: Sure, let me check that for you.\nAI: The stock price of Amazon on March 12th, 2022 was 3026.1.\nUser: I want to open a bank account.\nAI: Alright, I can help you with that. What account identifier would you like to use?\nUser: My account identifier is user4.\nAI: Great. What password would you like to use for your account?\nUser: My password is user4pass.\nAI: And what should I use as your name on the account?\nUser: Use John.",
    toolNames: ["OpenBankAccount", "QueryStock", "QueryBalance", "GetUserToken"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "OpenBankAccount", args: {"account":"user4","password":"user4pass","name":"John"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/25",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you tell me the stock price of Amazon on March 12th, 2022?",
    requirement: "Can you tell me the stock price of Amazon on March 12th, 2022?",
    task: "User: Can you tell me the stock price of Amazon on March 12th, 2022?\nAI: Sure, let me check that for you.\nAI: The stock price of Amazon on March 12th, 2022 was 3026.1.\nUser: I want to open a bank account.\nAI: Alright, I can help you with that. What account identifier would you like to use?\nUser: My account identifier is user4.\nAI: Great. What password would you like to use for your account?\nUser: My password is user4pass.\nAI: And what should I use as your name on the account?\nUser: Use John.\nAI: Your account has been successfully created.\nUser: How much money do I have in my account?",
    toolNames: ["OpenBankAccount", "QueryStock", "QueryBalance", "GetUserToken"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "GetUserToken", args: {"username":"user4","password":"user4pass"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/26",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you tell me the stock price of Amazon on March 12th, 2022?",
    requirement: "Can you tell me the stock price of Amazon on March 12th, 2022?",
    task: "User: Can you tell me the stock price of Amazon on March 12th, 2022?\nAI: Sure, let me check that for you.\nAI: The stock price of Amazon on March 12th, 2022 was 3026.1.\nUser: I want to open a bank account.\nAI: Alright, I can help you with that. What account identifier would you like to use?\nUser: My account identifier is user4.\nAI: Great. What password would you like to use for your account?\nUser: My password is user4pass.\nAI: And what should I use as your name on the account?\nUser: Use John.\nAI: Your account has been successfully created.\nUser: How much money do I have in my account?",
    toolNames: ["OpenBankAccount", "QueryStock", "QueryBalance", "GetUserToken"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "QueryBalance", args: {"token":"q9w8e7r6t5y4u3i2o1"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/27",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you tell me the stock price of Amazon on March 12th, 2022?",
    requirement: "Can you tell me the stock price of Amazon on March 12th, 2022?",
    task: "User: Can you tell me the stock price of Amazon on March 12th, 2022?\nAI: Sure, let me check that for you.\nAI: The stock price of Amazon on March 12th, 2022 was 3026.1.\nUser: I want to open a bank account.\nAI: Alright, I can help you with that. What account identifier would you like to use?\nUser: My account identifier is user4.\nAI: Great. What password would you like to use for your account?\nUser: My password is user4pass.\nAI: And what should I use as your name on the account?\nUser: Use John.\nAI: Your account has been successfully created.\nUser: How much money do I have in my account?",
    toolNames: ["OpenBankAccount", "QueryStock", "QueryBalance", "GetUserToken"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "QueryBalance", args: {"token":"q9w8e7r6t5y4u3i2o1"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/28",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you tell me about the stock price of SQ on March 15th, 2022?",
    requirement: "Can you tell me about the stock price of SQ on March 15th, 2022?",
    task: "User: Can you tell me about the stock price of SQ on March 15th, 2022?\nAI: Sure, I can help with that.",
    toolNames: ["QueryStock"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "QueryStock", args: {"stock_code":"SQ","date":"2022-03-15"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/29",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you add a reminder for a meeting on 2022-05-06 at 2 PM?",
    requirement: "Can you add a reminder for a meeting on 2022-05-06 at 2 PM?",
    task: "User: Can you add a reminder for a meeting on 2022-05-06 at 2 PM?\nAI: Sure, I can do that. For which username should I add the reminder?\nUser: user1\nAI: I also need your password to authenticate. Can you please tell me your username and password?\nUser: user1 user1pass",
    toolNames: ["GetUserToken", "AddReminder"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "GetUserToken", args: {"username":"user1","password":"user1pass"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/30",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you add a reminder for a meeting on 2022-05-06 at 2 PM?",
    requirement: "Can you add a reminder for a meeting on 2022-05-06 at 2 PM?",
    task: "User: Can you add a reminder for a meeting on 2022-05-06 at 2 PM?\nAI: Sure, I can do that. For which username should I add the reminder?\nUser: user1\nAI: I also need your password to authenticate. Can you please tell me your username and password?\nUser: user1 user1pass",
    toolNames: ["GetUserToken", "AddReminder"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "AddReminder", args: {"token":"n9m8k7j6h5g4f3d2s1a0","content":"Meeting","time":"2022-05-06 14:00:00"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/31",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you add a reminder for a meeting on 2022-05-06 at 2 PM?",
    requirement: "Can you add a reminder for a meeting on 2022-05-06 at 2 PM?",
    task: "User: Can you add a reminder for a meeting on 2022-05-06 at 2 PM?\nAI: Sure, I can do that. For which username should I add the reminder?\nUser: user1\nAI: I also need your password to authenticate. Can you please tell me your username and password?\nUser: user1 user1pass",
    toolNames: ["GetUserToken", "AddReminder"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "AddReminder", args: {"token":"n9m8k7j6h5g4f3d2s1a0","content":"Meeting","time":"2022-05-06 14:00:00"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/32",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you please cancel my appointment with id 78901234 for August 5th,…",
    requirement: "Can you please cancel my appointment with id 78901234 for August 5th, 2023 with Dr. Chen under the name Sarah Johnson?",
    task: "User: Can you please cancel my appointment with id 78901234 for August 5th, 2023 with Dr. Chen under the name Sarah Johnson?\nAI: Sure, I can help you with that.",
    toolNames: ["RecordHealthData", "CancelRegistration", "QueryRegistration"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "CancelRegistration", args: {"appointment_id":"78901234"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/33",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you please cancel my appointment with id 78901234 for August 5th,…",
    requirement: "Can you please cancel my appointment with id 78901234 for August 5th, 2023 with Dr. Chen under the name Sarah Johnson?",
    task: "User: Can you please cancel my appointment with id 78901234 for August 5th, 2023 with Dr. Chen under the name Sarah Johnson?\nAI: Sure, I can help you with that.\nAI: Your appointment has been cancelled, would you like to book a new one?\nUser: No, thank you. Can you also record my health data?\nAI: Of course! Please provide me your user ID, time and your health data.\nUser: My user ID is 12345, the time is 2023-08-06 09:00:00 and my health data is blood_pressure 120/80 and heart_rate 80.",
    toolNames: ["RecordHealthData", "CancelRegistration", "QueryRegistration"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "RecordHealthData", args: {"user_id":"12345","time":"2023-08-06 09:00:00","health_data":"[{"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/34",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you please cancel my appointment with id 78901234 for August 5th,…",
    requirement: "Can you please cancel my appointment with id 78901234 for August 5th, 2023 with Dr. Chen under the name Sarah Johnson?",
    task: "User: Can you please cancel my appointment with id 78901234 for August 5th, 2023 with Dr. Chen under the name Sarah Johnson?\nAI: Sure, I can help you with that.\nAI: Your appointment has been cancelled, would you like to book a new one?\nUser: No, thank you. Can you also record my health data?\nAI: Of course! Please provide me your user ID, time and your health data.\nUser: My user ID is 12345, the time is 2023-08-06 09:00:00 and my health data is blood_pressure 120/80 and heart_rate 80.\nAI: Your health data has been recorded successfully, is there anything else I can help you with?\nUser: Can you tell me if I had an appointment with Dr. Johnson on May 20th, 2023?\nAI: Sure, let me check that for you.",
    toolNames: ["RecordHealthData", "CancelRegistration", "QueryRegistration"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "QueryRegistration", args: {"patient_name":"Jane Smith","date":"2023-05-20"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/35",
    level: 1,
    category: "Level 1 - single call",
    title: "I forgot my password, can you help me reset it?",
    requirement: "I forgot my password, can you help me reset it?",
    task: "User: I forgot my password, can you help me reset it?\nAI: Sure, I can definitely help you. I need your username and email to get started.\nUser: My username is foo and my email is foo@example.com.\nAI: Alright.",
    toolNames: ["DeleteAccount", "ForgotPassword", "GetUserToken", "RegisterUser"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "ForgotPassword", args: {"status":"Forgot Password","username":"foo","email":"foo@example.com"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/36",
    level: 1,
    category: "Level 1 - single call",
    title: "I forgot my password, can you help me reset it?",
    requirement: "I forgot my password, can you help me reset it?",
    task: "User: I forgot my password, can you help me reset it?\nAI: Sure, I can definitely help you. I need your username and email to get started.\nUser: My username is foo and my email is foo@example.com.\nAI: Alright.\nAI: You have been sent a verification code. Please provide me with that code to reset your password.\nUser: The verification code is 970420.\nAI: What's your new password?\nUser: My new password is newpassword.\nAI: Great.",
    toolNames: ["DeleteAccount", "ForgotPassword", "GetUserToken", "RegisterUser"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "ForgotPassword", args: {"status":"Verification Code","verification_code":"970420","new_password":"newpassword"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/37",
    level: 1,
    category: "Level 1 - single call",
    title: "I forgot my password, can you help me reset it?",
    requirement: "I forgot my password, can you help me reset it?",
    task: "User: I forgot my password, can you help me reset it?\nAI: Sure, I can definitely help you. I need your username and email to get started.\nUser: My username is foo and my email is foo@example.com.\nAI: Alright.\nAI: You have been sent a verification code. Please provide me with that code to reset your password.\nUser: The verification code is 970420.\nAI: What's your new password?\nUser: My new password is newpassword.\nAI: Great.\nAI: Your password has been successfully reset.\nUser: I want to delete my account.\nAI: Okay, to delete your account, I need your token.\nAI: But, I see that I don't have your token. Can you please provide me with your username and password so that I can get your token and then proceed with your account deletion?\nUser: Yes, my username is foo and my password is newpassword.\nAI: Perfect.",
    toolNames: ["DeleteAccount", "ForgotPassword", "GetUserToken", "RegisterUser"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "GetUserToken", args: {"username":"foo","password":"newpassword"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/38",
    level: 1,
    category: "Level 1 - single call",
    title: "I forgot my password, can you help me reset it?",
    requirement: "I forgot my password, can you help me reset it?",
    task: "User: I forgot my password, can you help me reset it?\nAI: Sure, I can definitely help you. I need your username and email to get started.\nUser: My username is foo and my email is foo@example.com.\nAI: Alright.\nAI: You have been sent a verification code. Please provide me with that code to reset your password.\nUser: The verification code is 970420.\nAI: What's your new password?\nUser: My new password is newpassword.\nAI: Great.\nAI: Your password has been successfully reset.\nUser: I want to delete my account.\nAI: Okay, to delete your account, I need your token.\nAI: But, I see that I don't have your token. Can you please provide me with your username and password so that I can get your token and then proceed with your account deletion?\nUser: Yes, my username is foo and my password is newpassword.\nAI: Perfect.\nAI: I have received your token. Please confirm that you want to delete your account.\nUser: Yes, I want to delete my account.\nAI: Okay, I will delete your account.",
    toolNames: ["DeleteAccount", "ForgotPassword", "GetUserToken", "RegisterUser"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "DeleteAccount", args: {"token":"z9x8c7v6b5n4m3q2w1"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/39",
    level: 1,
    category: "Level 1 - single call",
    title: "I forgot my password, can you help me reset it?",
    requirement: "I forgot my password, can you help me reset it?",
    task: "User: I forgot my password, can you help me reset it?\nAI: Sure, I can definitely help you. I need your username and email to get started.\nUser: My username is foo and my email is foo@example.com.\nAI: Alright.\nAI: You have been sent a verification code. Please provide me with that code to reset your password.\nUser: The verification code is 970420.\nAI: What's your new password?\nUser: My new password is newpassword.\nAI: Great.\nAI: Your password has been successfully reset.\nUser: I want to delete my account.\nAI: Okay, to delete your account, I need your token.\nAI: But, I see that I don't have your token. Can you please provide me with your username and password so that I can get your token and then proceed with your account deletion?\nUser: Yes, my username is foo and my password is newpassword.\nAI: Perfect.\nAI: I have received your token. Please confirm that you want to delete your account.\nUser: Yes, I want to delete my account.\nAI: Okay, I will delete your account.\nAI: Your account has been successfully deleted.\nUser: I want to register for an account.\nAI: Sure, I can help you with that. Please provide me with your username, password, and email.\nUser: My username is foo, my password is bar, and my email is foo@example.com.\nAI: Thank you. Let me call the RegisterUser API to register your account.",
    toolNames: ["DeleteAccount", "ForgotPassword", "GetUserToken", "RegisterUser"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "RegisterUser", args: {"username":"foo","password":"bar","email":"foo@example.com"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/40",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me modify my account password?",
    requirement: "Can you help me modify my account password?",
    task: "User: Can you help me modify my account password?\nAI: Sure, I can help with that. I just need to authenticate you. Can you please provide me with your username, email and old password?\nUser: My username is user1, email is user1@example.com, and old password is user1pass.",
    toolNames: ["ModifyPassword", "GetUserToken"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "GetUserToken", args: {"username":"user1","password":"user1pass"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/41",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me modify my account password?",
    requirement: "Can you help me modify my account password?",
    task: "User: Can you help me modify my account password?\nAI: Sure, I can help with that. I just need to authenticate you. Can you please provide me with your username, email and old password?\nUser: My username is user1, email is user1@example.com, and old password is user1pass.\nAI: Great, now that I have your token, can you please provide me with your new password?\nUser: Yes, my new password is newpassword123.",
    toolNames: ["ModifyPassword", "GetUserToken"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "ModifyPassword", args: {"token":"n9m8k7j6h5g4f3d2s1a0","old_password":"user1pass","new_password":"newpassword123"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/42",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you check a reminder for me to call my mom on March 16th at 2:30…",
    requirement: "Can you check a reminder for me to call my mom on March 16th at 2:30 PM?",
    task: "User: Can you check a reminder for me to call my mom on March 16th at 2:30 PM?\nAI: Sure, I can help with that. Can you confirm your username and password?\nUser: My username is JohnDoe and my password is pass123.\nAI: Thank you. Let me authenticate you.",
    toolNames: ["QueryReminder", "GetUserToken"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "GetUserToken", args: {"username":"JohnDoe","password":"pass123"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/43",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you check a reminder for me to call my mom on March 16th at 2:30…",
    requirement: "Can you check a reminder for me to call my mom on March 16th at 2:30 PM?",
    task: "User: Can you check a reminder for me to call my mom on March 16th at 2:30 PM?\nAI: Sure, I can help with that. Can you confirm your username and password?\nUser: My username is JohnDoe and my password is pass123.\nAI: Thank you. Let me authenticate you.\nAI: Alright, your account has been authenticated. Now let me check the reminder for you.",
    toolNames: ["QueryReminder", "GetUserToken"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "QueryReminder", args: {"token":"a9s8d7f6g5h4j3k2l1","content":"Call mom","time":"2023-03-16 14:30:00"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/44",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me reschedule my appointment?",
    requirement: "Can you help me reschedule my appointment?",
    task: "User: Can you help me reschedule my appointment?\nAI: Of course. Please provide me with your appointment ID, the new appointment date, and the new doctor's name.\nUser: My appointment ID is 90123456, I want to reschedule it to October 20th with Dr. Johnson.\nAI: Okay. Let me modify your registration.",
    toolNames: ["ModifyRegistration"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "ModifyRegistration", args: {"appointment_id":"90123456","new_appointment_date":"2023-10-20","new_appointment_doctor":"Dr. Johnson"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/45",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me reset my password for my account?",
    requirement: "Can you help me reset my password for my account?",
    task: "User: Can you help me reset my password for my account?\nAI: Sure, what is your username and email associated with the account?\nUser: My username is user1 and my email is user1@example.com\nAI: Okay, I have initiated the password reset process. Please check your email for the verification code. Once you receive it, please let me know.",
    toolNames: ["DeleteAccount", "ForgotPassword", "GetUserToken"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "ForgotPassword", args: {"status":"Forgot Password","username":"user1","email":"user1@example.com"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/46",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me reset my password for my account?",
    requirement: "Can you help me reset my password for my account?",
    task: "User: Can you help me reset my password for my account?\nAI: Sure, what is your username and email associated with the account?\nUser: My username is user1 and my email is user1@example.com\nAI: Okay, I have initiated the password reset process. Please check your email for the verification code. Once you receive it, please let me know.\nUser: Okay, I received the verification code. Now, what should I do?\nAI: Great! Please give me the verification code and the new password you want to set.\nUser: The verification code is 970420 and the new password is user1newpass",
    toolNames: ["DeleteAccount", "ForgotPassword", "GetUserToken"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "ForgotPassword", args: {"status":"Verification Code","verification_code":"970420","new_password":"user1newpass"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/47",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me reset my password for my account?",
    requirement: "Can you help me reset my password for my account?",
    task: "User: Can you help me reset my password for my account?\nAI: Sure, what is your username and email associated with the account?\nUser: My username is user1 and my email is user1@example.com\nAI: Okay, I have initiated the password reset process. Please check your email for the verification code. Once you receive it, please let me know.\nUser: Okay, I received the verification code. Now, what should I do?\nAI: Great! Please give me the verification code and the new password you want to set.\nUser: The verification code is 970420 and the new password is user1newpass\nAI: Your password has been reset successfully. Is there anything else I can assist you with?\nUser: Can you help me delete my account?\nAI: Sure, I just need to get the token for authentication. What is your username and password?\nUser: My username is user1 and my password is user1pass",
    toolNames: ["DeleteAccount", "ForgotPassword", "GetUserToken"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "GetUserToken", args: {"username":"user1","password":"user1newpass"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/48",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me reset my password for my account?",
    requirement: "Can you help me reset my password for my account?",
    task: "User: Can you help me reset my password for my account?\nAI: Sure, what is your username and email associated with the account?\nUser: My username is user1 and my email is user1@example.com\nAI: Okay, I have initiated the password reset process. Please check your email for the verification code. Once you receive it, please let me know.\nUser: Okay, I received the verification code. Now, what should I do?\nAI: Great! Please give me the verification code and the new password you want to set.\nUser: The verification code is 970420 and the new password is user1newpass\nAI: Your password has been reset successfully. Is there anything else I can assist you with?\nUser: Can you help me delete my account?\nAI: Sure, I just need to get the token for authentication. What is your username and password?\nUser: My username is user1 and my password is user1pass\nAI: I have obtained the token. Please verify that you want to delete your account.\nUser: Yes, I want to delete my account.",
    toolNames: ["DeleteAccount", "ForgotPassword", "GetUserToken"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "DeleteAccount", args: {"token":"n9m8k7j6h5g4f3d2s1a0"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/49",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you set a reminder for me to call my mom tomorrow at 10 AM?",
    requirement: "Can you set a reminder for me to call my mom tomorrow at 10 AM?",
    task: "User: Can you set a reminder for me to call my mom tomorrow at 10 AM?\nAI: Sure, I can help with that. Do you have an account with us?\nUser: Yes, my username is user1 and my password is user1pass.\nAI: Great. Let me authenticate you.",
    toolNames: ["GetUserToken", "AddReminder"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "GetUserToken", args: {"username":"user1","password":"user1pass"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/50",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you set a reminder for me to call my mom tomorrow at 10 AM?",
    requirement: "Can you set a reminder for me to call my mom tomorrow at 10 AM?",
    task: "User: Can you set a reminder for me to call my mom tomorrow at 10 AM?\nAI: Sure, I can help with that. Do you have an account with us?\nUser: Yes, my username is user1 and my password is user1pass.\nAI: Great. Let me authenticate you.\nAI: Got it. What's the content of the reminder?\nUser: \"Call mom\"\nAI: And what time do you want to be reminded?\nUser: \"2022-05-10 at 10 AM\"\nAI: Ok.",
    toolNames: ["GetUserToken", "AddReminder"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "AddReminder", args: {"token":"n9m8k7j6h5g4f3d2s1a0","content":"Call mom","time":"2022-05-10 10:00:00"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/51",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me add a new schedule to my agenda?",
    requirement: "Can you help me add a new schedule to my agenda?",
    task: "User: Can you help me add a new schedule to my agenda?\nAI: Sure, I'd be happy to help. What should be the content of this schedule?\nUser: The content is \"Meeting with John\".\nAI: Great. When should this meeting take place?\nUser: The meeting should be on the 21th of September at 3 pm.\nAI: And where would you like the meeting to take place?\nUser: The meeting will take place in the cafeteria.\nAI: Alright. Let me add this schedule to your agenda. Please wait a moment while I authenticate your account.",
    toolNames: ["GetUserToken", "AddAgenda"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "GetUserToken", args: {"username":"foo","password":"bar"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/52",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me add a new schedule to my agenda?",
    requirement: "Can you help me add a new schedule to my agenda?",
    task: "User: Can you help me add a new schedule to my agenda?\nAI: Sure, I'd be happy to help. What should be the content of this schedule?\nUser: The content is \"Meeting with John\".\nAI: Great. When should this meeting take place?\nUser: The meeting should be on the 21th of September at 3 pm.\nAI: And where would you like the meeting to take place?\nUser: The meeting will take place in the cafeteria.\nAI: Alright. Let me add this schedule to your agenda. Please wait a moment while I authenticate your account.\nAI: Okay, I have retrieved your token.",
    toolNames: ["GetUserToken", "AddAgenda"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "AddAgenda", args: {"token":"z9x8c7v6b5n4m3q2w1","content":"Meeting with John","time":"2023-09-21 15:00:00","location":"cafeteria"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/53",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me record my recent health data?",
    requirement: "Can you help me record my recent health data?",
    task: "User: Can you help me record my recent health data?\nAI: Sure, I can help you with that. What's your user ID, time, and health data?\nUser: My user ID is 123, time is 2023-09-01 10:15:00, and my health data is [{'name': 'blood_pressure', 'value': '120/80'}, {'name': 'heart_rate', 'value': '80'}].\nAI: Okay, let me record it for you.",
    toolNames: ["EmergencyKnowledge", "AppointmentRegistration", "RecordHealthData"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "RecordHealthData", args: {"user_id":"123","time":"2023-09-01 10:15:00","health_data":"[{"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/54",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me record my recent health data?",
    requirement: "Can you help me record my recent health data?",
    task: "User: Can you help me record my recent health data?\nAI: Sure, I can help you with that. What's your user ID, time, and health data?\nUser: My user ID is 123, time is 2023-09-01 10:15:00, and my health data is [{'name': 'blood_pressure', 'value': '120/80'}, {'name': 'heart_rate', 'value': '80'}].\nAI: Okay, let me record it for you.\nAI: Your health data has been recorded successfully. Is there anything else you need help with?\nUser: Yes, I also need to register an appointment to see Dr. Smith.\nAI: All right. When do you want to make the appointment and what's your name?\nUser: My name is John and I want to make the appointment on September 3rd.\nAI: Okay, let me check Dr. Smith's availability.",
    toolNames: ["EmergencyKnowledge", "AppointmentRegistration", "RecordHealthData"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "AppointmentRegistration", args: {"patient_name":"John","date":"2023-09-03","doctor_name":"Smith"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/55",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me record my recent health data?",
    requirement: "Can you help me record my recent health data?",
    task: "User: Can you help me record my recent health data?\nAI: Sure, I can help you with that. What's your user ID, time, and health data?\nUser: My user ID is 123, time is 2023-09-01 10:15:00, and my health data is [{'name': 'blood_pressure', 'value': '120/80'}, {'name': 'heart_rate', 'value': '80'}].\nAI: Okay, let me record it for you.\nAI: Your health data has been recorded successfully. Is there anything else you need help with?\nUser: Yes, I also need to register an appointment to see Dr. Smith.\nAI: All right. When do you want to make the appointment and what's your name?\nUser: My name is John and I want to make the appointment on September 3rd.\nAI: Okay, let me check Dr. Smith's availability.\nAI: The appointment has been made for you. Your appointment ID is 16103729. Do you need help with anything else?\nUser: Yes, I have a fever and want to know more about it.\nAI: I can help you with that. What are your symptoms?\nUser: Just a fever.\nAI: Got it. Let me check for you.",
    toolNames: ["EmergencyKnowledge", "AppointmentRegistration", "RecordHealthData"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "EmergencyKnowledge", args: {"symptom":"fever"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/56",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you delete my account please?",
    requirement: "Can you delete my account please?",
    task: "User: Can you delete my account please?\nAI: Sure. Please provide me your username, password, and token.\nUser: My username is \"foo\", password is \"bar\".",
    toolNames: ["DeleteAccount", "GetUserToken"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "GetUserToken", args: {"username":"foo","password":"bar"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/57",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you delete my account please?",
    requirement: "Can you delete my account please?",
    task: "User: Can you delete my account please?\nAI: Sure. Please provide me your username, password, and token.\nUser: My username is \"foo\", password is \"bar\".",
    toolNames: ["DeleteAccount", "GetUserToken"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "DeleteAccount", args: {"token":"z9x8c7v6b5n4m3q2w1"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/58",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you delete my account please?",
    requirement: "Can you delete my account please?",
    task: "User: Can you delete my account please?\nAI: Sure. Please provide me your username, password, and token.\nUser: My username is \"foo\", password is \"bar\".",
    toolNames: ["DeleteAccount", "GetUserToken"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "DeleteAccount", args: {"token":"z9x8c7v6b5n4m3q2w1"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/59",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me change my account password?",
    requirement: "Can you help me change my account password?",
    task: "User: Can you help me change my account password?\nAI: Sure, to change your password, I will need your old password and the new password you want to set.",
    toolNames: ["ModifyPassword", "GetUserToken"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "GetUserToken", args: {"username":"admin","password":"adminpass"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/60",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me change my account password?",
    requirement: "Can you help me change my account password?",
    task: "User: Can you help me change my account password?\nAI: Sure, to change your password, I will need your old password and the new password you want to set.\nAI: I found that you are logged in as the admin. Please provide me the old password and the new password you want to set.\nUser: My old password is adminpass and the new password is 654321.",
    toolNames: ["ModifyPassword", "GetUserToken"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "ModifyPassword", args: {"token":"m9n8b7v6c5x4z3a2s1","old_password":"adminpass","new_password":"654321"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/61",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you cancel a timed switch for my smart device?",
    requirement: "Can you cancel a timed switch for my smart device?",
    task: "User: Can you cancel a timed switch for my smart device?\nAI: Sure, I can help with that. Please provide me the ID of your smart device.\nUser: It's 10000025.\nAI: And what's the time for the current timed switch?\nUser: It's set for March 19th, 2023 at 9:30 AM.\nAI: Understood. Let me just call the CancelTimedSwitch API to cancel the timed switch.",
    toolNames: ["CancelTimedSwitch"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "CancelTimedSwitch", args: {"device_id":"10000025","time":"2023-03-19 09:30:00"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/62",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you describe this image for me?",
    requirement: "Can you describe this image for me?",
    task: "User: Can you describe this image for me?\nAI: Sure, please provide me with the URL for the image.\nUser: Here it is: http://l7.alamy.com/zooms/278b12a987734ec285da7155397e0d0a/an-airplane-takes-off-from-terminal-1-at-manchester-international-h4b040.jpg",
    toolNames: ["ImageCaption"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "ImageCaption", args: {"url":"http://l7.alamy.com/zooms/278b12a987734ec285da7155397e0d0a/an-airplane-takes-off-from-terminal-1-at-manchester-international-h4b040.jpg"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/63",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you please tell me which devices are included in the \"Morning Rou…",
    requirement: "Can you please tell me which devices are included in the \"Morning Routine\" scene?",
    task: "User: Can you please tell me which devices are included in the \"Morning Routine\" scene?\nAI: Sure, let me check.",
    toolNames: ["QueryScene"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "QueryScene", args: {"name":"Morning Routine"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/64",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you tell me what's the current date?",
    requirement: "Can you tell me what's the current date?",
    task: "User: Can you tell me what's the current date?\nAI: Sure, I can help you with that.",
    toolNames: ["GetToday"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "GetToday", args: {} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/65",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me with a health issue?",
    requirement: "Can you help me with a health issue?",
    task: "User: Can you help me with a health issue?\nAI: Sure, what's the problem?\nUser: I'm experiencing shortness of breath.\nAI: Alright, let me see what I can find.",
    toolNames: ["EmergencyKnowledge", "ModifyRegistration"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "EmergencyKnowledge", args: {"symptom":"shortness of breath"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/66",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me with a health issue?",
    requirement: "Can you help me with a health issue?",
    task: "User: Can you help me with a health issue?\nAI: Sure, what's the problem?\nUser: I'm experiencing shortness of breath.\nAI: Alright, let me see what I can find.\nAI: I found the following possible conditions: Asthma and Pneumonia. Here is what I know about them: Asthma is a chronic respiratory condition characterized by inflammation and narrowing of the airways, leading to shortness of breath, wheezing, and coughing. Treatment may involve inhalers or nebulizers to open the airways, as well as medications to manage inflammation and prevent attacks. Pneumonia is an infection of the lungs that can cause fever, cough, shortness of breath, and other symptoms. Treatment may involve antibiotics, rest, and fluids to help the body fight the infection and recover. Does that help?\nUser: Yes, thank you.\nAI: You're welcome. Do you have any other questions?\nUser: Yes, I need to change my appointment with Dr. Smith on October 10th, the appointment id is 90123456.\nAI: Okay, I can help with that. What do you want to change it to?\nUser: Can we move it to October 15th and have it with Dr. Johnson instead?\nAI: Got it. Let me modify that appointment for you.",
    toolNames: ["EmergencyKnowledge", "ModifyRegistration"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "ModifyRegistration", args: {"appointment_id":"90123456","new_appointment_date":"2023-10-15","new_appointment_doctor":"Dr. Johnson"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/67",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me open a bank account?",
    requirement: "Can you help me open a bank account?",
    task: "User: Can you help me open a bank account?\nAI: Sure, I can assist you with that. What account identifier would you like to use?\nUser: My chosen account identifier is \"johndoe123\"\nAI: Great! What password would you like to use for this account?\nUser: \"mypass123\"\nAI: And what is the name of the account holder?\nUser: John Doe\nAI: Thank you. Let me go ahead and open this bank account for you.",
    toolNames: ["OpenBankAccount"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "OpenBankAccount", args: {"account":"johndoe123","password":"mypass123","name":"John Doe"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/68",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me with some basic math problems?",
    requirement: "Can you help me with some basic math problems?",
    task: "User: Can you help me with some basic math problems?\nAI: Sure thing! What do you need help with?\nUser: What is the result of (9+6)*3?\nAI: Calculating...",
    toolNames: ["Calculator"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "Calculator", args: {"formula":"(9+6)*3"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/69",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me with some basic math problems?",
    requirement: "Can you help me with some basic math problems?",
    task: "User: Can you help me with some basic math problems?\nAI: Sure thing! What do you need help with?\nUser: What is the result of (9+6)*3?\nAI: Calculating...\nAI: The result of (9+6)*3 is 45. Is there anything else I can help you with?\nUser: Can you help me with calculating the area of a rectangle?\nAI: Definitely! What is the length and width of the rectangle?\nUser: The length is 5 and the width is 10.\nAI: Calculating...",
    toolNames: ["Calculator"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "Calculator", args: {"formula":"5*10"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/70",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me reschedule my appointment with Dr. Smith on April 12t…",
    requirement: "Can you help me reschedule my appointment with Dr. Smith on April 12th?",
    task: "User: Can you help me reschedule my appointment with Dr. Smith on April 12th?\nAI: Sure, I can help with that. Please give me your appointment ID.\nUser: It's 12345678.\nAI: Got it. What would you like to reschedule your appointment to, and who would you like to see instead of Dr. Smith?\nUser: I'd like to reschedule to April 15th, and I want to see Dr. Johnson instead of Dr. Smith.\nAI: Alright. Let me modify your appointment.",
    toolNames: ["EmergencyKnowledge", "ModifyRegistration"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "ModifyRegistration", args: {"appointment_id":"12345678","new_appointment_date":"2023-04-15","new_appointment_doctor":"Dr. Johnson"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/71",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me reschedule my appointment with Dr. Smith on April 12t…",
    requirement: "Can you help me reschedule my appointment with Dr. Smith on April 12th?",
    task: "User: Can you help me reschedule my appointment with Dr. Smith on April 12th?\nAI: Sure, I can help with that. Please give me your appointment ID.\nUser: It's 12345678.\nAI: Got it. What would you like to reschedule your appointment to, and who would you like to see instead of Dr. Smith?\nUser: I'd like to reschedule to April 15th, and I want to see Dr. Johnson instead of Dr. Smith.\nAI: Alright. Let me modify your appointment.\nAI: Your appointment has been successfully rescheduled. Is there anything else I can help with?\nUser: Yes, can you search for possible diseases related to my fatigue symptom?\nAI: Of course. What type of fatigue are you experiencing?\nUser: Just general fatigue.\nAI: Okay. Here are some possible diseases related to your fatigue symptom:",
    toolNames: ["EmergencyKnowledge", "ModifyRegistration"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "EmergencyKnowledge", args: {"symptom":"fatigue"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/72",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me delete my account?",
    requirement: "Can you help me delete my account?",
    task: "User: Can you help me delete my account?\nAI: Of course. Before we proceed, to ensure your security, may I confirm your username and password?\nUser: Yes, my username is foo and password is bar.\nAI: Thank you. I need to retrieve your token from our server to proceed with deleting your account.",
    toolNames: ["DeleteAccount", "GetUserToken"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "GetUserToken", args: {"username":"foo","password":"bar"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/73",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me delete my account?",
    requirement: "Can you help me delete my account?",
    task: "User: Can you help me delete my account?\nAI: Of course. Before we proceed, to ensure your security, may I confirm your username and password?\nUser: Yes, my username is foo and password is bar.\nAI: Thank you. I need to retrieve your token from our server to proceed with deleting your account.\nAI: Great, I have retrieved your token.",
    toolNames: ["DeleteAccount", "GetUserToken"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "DeleteAccount", args: {"token":"z9x8c7v6b5n4m3q2w1"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/74",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you tell me the stock price of NFLX on February 17, 2022?",
    requirement: "Can you tell me the stock price of NFLX on February 17, 2022?",
    task: "User: Can you tell me the stock price of NFLX on February 17, 2022?\nAI: Sure, I can help you with that.",
    toolNames: ["QueryStock", "QueryBalance", "GetUserToken"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "QueryStock", args: {"stock_code":"NFLX","date":"2022-02-17"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/75",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you tell me the stock price of NFLX on February 17, 2022?",
    requirement: "Can you tell me the stock price of NFLX on February 17, 2022?",
    task: "User: Can you tell me the stock price of NFLX on February 17, 2022?\nAI: Sure, I can help you with that.\nAI: The stock price of NFLX on February 17, 2022 was 605.7.\nUser: What is my current balance?\nAI: To protect your account, can you please authenticate by providing your username and password?\nUser: Okay. My username is user1 and my password is user1pass.",
    toolNames: ["QueryStock", "QueryBalance", "GetUserToken"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "GetUserToken", args: {"username":"user1","password":"user1pass"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/76",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you tell me the stock price of NFLX on February 17, 2022?",
    requirement: "Can you tell me the stock price of NFLX on February 17, 2022?",
    task: "User: Can you tell me the stock price of NFLX on February 17, 2022?\nAI: Sure, I can help you with that.\nAI: The stock price of NFLX on February 17, 2022 was 605.7.\nUser: What is my current balance?\nAI: To protect your account, can you please authenticate by providing your username and password?\nUser: Okay. My username is user1 and my password is user1pass.",
    toolNames: ["QueryStock", "QueryBalance", "GetUserToken"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "QueryBalance", args: {"token":"n9m8k7j6h5g4f3d2s1a0"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/77",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you tell me the stock price of NFLX on February 17, 2022?",
    requirement: "Can you tell me the stock price of NFLX on February 17, 2022?",
    task: "User: Can you tell me the stock price of NFLX on February 17, 2022?\nAI: Sure, I can help you with that.\nAI: The stock price of NFLX on February 17, 2022 was 605.7.\nUser: What is my current balance?\nAI: To protect your account, can you please authenticate by providing your username and password?\nUser: Okay. My username is user1 and my password is user1pass.",
    toolNames: ["QueryStock", "QueryBalance", "GetUserToken"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "QueryBalance", args: {"token":"n9m8k7j6h5g4f3d2s1a0"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/78",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you tell me about the historical events of April 21st?",
    requirement: "Can you tell me about the historical events of April 21st?",
    task: "User: Can you tell me about the historical events of April 21st?\nAI: Sure, for which year do you want the historical events?\nUser: 1903",
    toolNames: ["QueryHistoryToday", "Calculator"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "QueryHistoryToday", args: {"date":"04-21"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/79",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you tell me about the historical events of April 21st?",
    requirement: "Can you tell me about the historical events of April 21st?",
    task: "User: Can you tell me about the historical events of April 21st?\nAI: Sure, for which year do you want the historical events?\nUser: 1903\nAI: The New York Yankees (then known as the New York Highlanders) played their first game in franchise history, losing to the Washington Senators by a score of 3-1 at Hilltop Park in New York City.\nUser: Can you solve this equation for me: (2+3)*5",
    toolNames: ["QueryHistoryToday", "Calculator"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "Calculator", args: {"formula":"(2+3)*5"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/80",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you give me my health data between March 5th and March 18th of th…",
    requirement: "Can you give me my health data between March 5th and March 18th of this year?",
    task: "User: Can you give me my health data between March 5th and March 18th of this year?\nAI: Sure! Please provide me your user ID.\nUser: My user ID is E97531.\nAI: Got it. What was the start time of the period you are interested in?\nUser: March 5th, 2023 10:00 AM.\nAI: And what was the end time?\nUser: March 18th, 2023 8:00 PM.\nAI: Thank you. Here is your health data between March 5th and March 18th of this year.",
    toolNames: ["SymptomSearch", "QueryHealthData", "CancelRegistration"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "QueryHealthData", args: {"user_id":"E97531","start_time":"2023-03-05 10:00:00","end_time":"2023-03-18 20:00:00"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/81",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you give me my health data between March 5th and March 18th of th…",
    requirement: "Can you give me my health data between March 5th and March 18th of this year?",
    task: "User: Can you give me my health data between March 5th and March 18th of this year?\nAI: Sure! Please provide me your user ID.\nUser: My user ID is E97531.\nAI: Got it. What was the start time of the period you are interested in?\nUser: March 5th, 2023 10:00 AM.\nAI: And what was the end time?\nUser: March 18th, 2023 8:00 PM.\nAI: Thank you. Here is your health data between March 5th and March 18th of this year.\nAI: Is there anything else you need?\nUser: Yes, can you help me cancel my appointment with Dr. Smith on April 12th?\nAI: Of course! What is your appointment ID?\nUser: My appointment ID is 12345678.\nAI: All set, What is the name of the patient?\nUser: The patient's name is John Doe.\nAI: And what is the name of the doctor?\nUser: Dr. Smith.\nAI: What was the date of the appointment?\nUser: April 12th, 2023.\nAI: I have cancelled your appointment with Dr. Smith on April 12th successfully.",
    toolNames: ["SymptomSearch", "QueryHealthData", "CancelRegistration"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "CancelRegistration", args: {"appointment_id":"12345678"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/82",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you give me my health data between March 5th and March 18th of th…",
    requirement: "Can you give me my health data between March 5th and March 18th of this year?",
    task: "User: Can you give me my health data between March 5th and March 18th of this year?\nAI: Sure! Please provide me your user ID.\nUser: My user ID is E97531.\nAI: Got it. What was the start time of the period you are interested in?\nUser: March 5th, 2023 10:00 AM.\nAI: And what was the end time?\nUser: March 18th, 2023 8:00 PM.\nAI: Thank you. Here is your health data between March 5th and March 18th of this year.\nAI: Is there anything else you need?\nUser: Yes, can you help me cancel my appointment with Dr. Smith on April 12th?\nAI: Of course! What is your appointment ID?\nUser: My appointment ID is 12345678.\nAI: All set, What is the name of the patient?\nUser: The patient's name is John Doe.\nAI: And what is the name of the doctor?\nUser: Dr. Smith.\nAI: What was the date of the appointment?\nUser: April 12th, 2023.\nAI: I have cancelled your appointment with Dr. Smith on April 12th successfully.\nAI: Can I help you with anything else?\nUser: Yes, please help me find information about nausea symptoms.\nAI: Sure thing! What symptoms are you experiencing?\nUser: I'm feeling nauseous.\nAI: I understand. Let me search for possible diseases related to your symptom.",
    toolNames: ["SymptomSearch", "QueryHealthData", "CancelRegistration"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "SymptomSearch", args: {"symptom":"nausea"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/83",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you search for the definition of the word 'perplexed'?",
    requirement: "Can you search for the definition of the word 'perplexed'?",
    task: "User: Can you search for the definition of the word 'perplexed'?\nAI: Sure, let me check for you.",
    toolNames: ["Dictionary"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "Dictionary", args: {"keyword":"perplexed"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/84",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you give me the list of devices in the Morning Routine scene?",
    requirement: "Can you give me the list of devices in the Morning Routine scene?",
    task: "User: Can you give me the list of devices in the Morning Routine scene?\nAI: Sure. Please provide the name of the scene.\nUser: Morning Routine.",
    toolNames: ["QueryScene"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "QueryScene", args: {"name":"Morning Routine"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/85",
    level: 1,
    category: "Level 1 - single call",
    title: "Hi there, can you tell me today's date?",
    requirement: "Hi there, can you tell me today's date?",
    task: "User: Hi there, can you tell me today's date?",
    toolNames: ["ModifyMeeting", "GetToday", "ModifyAlarm", "GetUserToken"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "GetToday", args: {} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/86",
    level: 1,
    category: "Level 1 - single call",
    title: "Hi there, can you tell me today's date?",
    requirement: "Hi there, can you tell me today's date?",
    task: "User: Hi there, can you tell me today's date?\nAI: Sure, the current date is 2023-03-31.\nUser: Can you help me modify a meeting reservation?\nAI: Of course, please provide me with the necessary information such as the meeting topic, start time, end time, location, and attendees.\nUser: The meeting topic is Team Building Activity, start time is April 1, 2023 at 10:00 AM, end time is April 1, 2023 at 12:00 PM, location is Recreation Center, and attendees are Jackie Lee and Mike Chen. My username is JaneSmith.\nAI: To modify the meeting reservation, I need to authenticate your account. Please provide me with your password and email.\nUser: My email is janesmith@example.com and my password is password.\nAI: Thank you.",
    toolNames: ["ModifyMeeting", "GetToday", "ModifyAlarm", "GetUserToken"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "GetUserToken", args: {"username":"JaneSmith","password":"password"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/87",
    level: 1,
    category: "Level 1 - single call",
    title: "Hi there, can you tell me today's date?",
    requirement: "Hi there, can you tell me today's date?",
    task: "User: Hi there, can you tell me today's date?\nAI: Sure, the current date is 2023-03-31.\nUser: Can you help me modify a meeting reservation?\nAI: Of course, please provide me with the necessary information such as the meeting topic, start time, end time, location, and attendees.\nUser: The meeting topic is Team Building Activity, start time is April 1, 2023 at 10:00 AM, end time is April 1, 2023 at 12:00 PM, location is Recreation Center, and attendees are Jackie Lee and Mike Chen. My username is JaneSmith.\nAI: To modify the meeting reservation, I need to authenticate your account. Please provide me with your password and email.\nUser: My email is janesmith@example.com and my password is password.\nAI: Thank you.\nAI: Now, please provide me with the meeting information.\nUser: The meeting information is meeting topic is Team Building Activity, start time is April 1, 2023 at 10:00 AM, end time is April 1, 2023 at 12:00 PM, location is Recreation Center, and attendees are Jackie Lee and Mike Chen.\nAI: Thank you.",
    toolNames: ["ModifyMeeting", "GetToday", "ModifyAlarm", "GetUserToken"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "ModifyMeeting", args: {"token":"o8i7u6y5t4r3e2w1q0","meeting_topic":"Team Building Activity","start_time":"2023-04-01 10:00:00","end_time":"2023-04-01 12:00:00","location":"Recreation Center","attendees":"["} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/88",
    level: 1,
    category: "Level 1 - single call",
    title: "Hi there, can you tell me today's date?",
    requirement: "Hi there, can you tell me today's date?",
    task: "User: Hi there, can you tell me today's date?\nAI: Sure, the current date is 2023-03-31.\nUser: Can you help me modify a meeting reservation?\nAI: Of course, please provide me with the necessary information such as the meeting topic, start time, end time, location, and attendees.\nUser: The meeting topic is Team Building Activity, start time is April 1, 2023 at 10:00 AM, end time is April 1, 2023 at 12:00 PM, location is Recreation Center, and attendees are Jackie Lee and Mike Chen. My username is JaneSmith.\nAI: To modify the meeting reservation, I need to authenticate your account. Please provide me with your password and email.\nUser: My email is janesmith@example.com and my password is password.\nAI: Thank you.\nAI: Now, please provide me with the meeting information.\nUser: The meeting information is meeting topic is Team Building Activity, start time is April 1, 2023 at 10:00 AM, end time is April 1, 2023 at 12:00 PM, location is Recreation Center, and attendees are Jackie Lee and Mike Chen.\nAI: Thank you.\nAI: The meeting has been successfully modified.\nUser: Can you help me modify an alarm?\nAI: Sure, please provide me the time for which alarm needs to be modified.\nUser: The alarm time is on March 20, 2023 at 6:30 AM.\nAI: Now, please provide me with the modified alarm time.\nUser: The modified alarm time is on March 20, 2023 at 7:00 AM.\nAI: Thank you.",
    toolNames: ["ModifyMeeting", "GetToday", "ModifyAlarm", "GetUserToken"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "ModifyAlarm", args: {"token":"o8i7u6y5t4r3e2w1q0","from_time":"2023-03-20 06:30:00","to_time":"2023-03-20 07:00:00"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/89",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you record my recent health data please?",
    requirement: "Can you record my recent health data please?",
    task: "User: Can you record my recent health data please?\nAI: Sure, I can help you with that. Can you please provide me with your user ID, the time of the data, and the health data you want to record?\nUser: My user ID is 12345, the date is August 15th, 2023 at 12:30 PM, and my health data is blood pressure 120/80 and heart rate 80.\nAI: Alright, I got it. Let me record this data for you.",
    toolNames: ["EmergencyKnowledge", "AppointmentRegistration", "RecordHealthData"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "RecordHealthData", args: {"user_id":"12345","time":"2023-08-15 12:30:00","health_data":"[{"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/90",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you record my recent health data please?",
    requirement: "Can you record my recent health data please?",
    task: "User: Can you record my recent health data please?\nAI: Sure, I can help you with that. Can you please provide me with your user ID, the time of the data, and the health data you want to record?\nUser: My user ID is 12345, the date is August 15th, 2023 at 12:30 PM, and my health data is blood pressure 120/80 and heart rate 80.\nAI: Alright, I got it. Let me record this data for you.\nAI: Your health data has been recorded successfully. Is there anything else that I can help you with?\nUser: Yes, I want to schedule an appointment with Dr. Smith.\nAI: Certainly. What is your name, the date you want the appointment, and the name of the doctor?\nUser: My name is John, I want to schedule my appointment on September 1st, 2023, and the doctor's name is Dr. Smith.\nAI: Okay, let me check the doctor's availability.",
    toolNames: ["EmergencyKnowledge", "AppointmentRegistration", "RecordHealthData"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "AppointmentRegistration", args: {"patient_name":"John","date":"2023-09-01","doctor_name":"Dr. Smith"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/91",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you record my recent health data please?",
    requirement: "Can you record my recent health data please?",
    task: "User: Can you record my recent health data please?\nAI: Sure, I can help you with that. Can you please provide me with your user ID, the time of the data, and the health data you want to record?\nUser: My user ID is 12345, the date is August 15th, 2023 at 12:30 PM, and my health data is blood pressure 120/80 and heart rate 80.\nAI: Alright, I got it. Let me record this data for you.\nAI: Your health data has been recorded successfully. Is there anything else that I can help you with?\nUser: Yes, I want to schedule an appointment with Dr. Smith.\nAI: Certainly. What is your name, the date you want the appointment, and the name of the doctor?\nUser: My name is John, I want to schedule my appointment on September 1st, 2023, and the doctor's name is Dr. Smith.\nAI: Okay, let me check the doctor's availability.\nAI: Great, your appointment with Dr. Smith on September 1st, 2023 has been confirmed. Your appointment ID is ABC123. Is there anything else you need help with?\nUser: Yes, I have a fever and I'm not sure what to do.\nAI: I can help with that. What is your symptom?\nUser: My symptom is a fever.\nAI: Alright, let me check for you.",
    toolNames: ["EmergencyKnowledge", "AppointmentRegistration", "RecordHealthData"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "EmergencyKnowledge", args: {"symptom":"fever"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/92",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me register for an account on this platform?",
    requirement: "Can you help me register for an account on this platform?",
    task: "User: Can you help me register for an account on this platform?\nAI: Sure, I can help you with that. What would you like your username to be?\nUser: My preferred username is \"johndoe\".\nAI: Great! What would you like your password to be?\nUser: How about \"mypassword123\"?\nAI: Okay, and what is your email address?\nUser: It's johndoe@email.com.",
    toolNames: ["RegisterUser"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "RegisterUser", args: {"username":"johndoe","password":"mypassword123","email":"johndoe@email.com"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/93",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me add a schedule item for tomorrow at 9am with the titl…",
    requirement: "Can you help me add a schedule item for tomorrow at 9am with the title \"Meeting with John\" at the coffee shop on Main Street?",
    task: "User: Can you help me add a schedule item for tomorrow at 9am with the title \"Meeting with John\" at the coffee shop on Main Street?\nAI: Sure, to confirm, you want to add a schedule item for tomorrow, October 26th, at 9am, with the title \"Meeting with John\" at the coffee shop on Main Street, is that correct?",
    toolNames: ["GetUserToken", "AddAgenda"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "GetUserToken", args: {"username":"JohnDoe","password":"pass123"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/94",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me add a schedule item for tomorrow at 9am with the titl…",
    requirement: "Can you help me add a schedule item for tomorrow at 9am with the title \"Meeting with John\" at the coffee shop on Main Street?",
    task: "User: Can you help me add a schedule item for tomorrow at 9am with the title \"Meeting with John\" at the coffee shop on Main Street?\nAI: Sure, to confirm, you want to add a schedule item for tomorrow, October 26th, at 9am, with the title \"Meeting with John\" at the coffee shop on Main Street, is that correct?",
    toolNames: ["GetUserToken", "AddAgenda"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "AddAgenda", args: {"token":"a9s8d7f6g5h4j3k2l1","content":"Meeting with John","time":"2023-10-26 09:00:00","location":"coffee shop on Main Street"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/95",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me add a schedule item for tomorrow at 9am with the titl…",
    requirement: "Can you help me add a schedule item for tomorrow at 9am with the title \"Meeting with John\" at the coffee shop on Main Street?",
    task: "User: Can you help me add a schedule item for tomorrow at 9am with the title \"Meeting with John\" at the coffee shop on Main Street?\nAI: Sure, to confirm, you want to add a schedule item for tomorrow, October 26th, at 9am, with the title \"Meeting with John\" at the coffee shop on Main Street, is that correct?",
    toolNames: ["GetUserToken", "AddAgenda"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "AddAgenda", args: {"token":"a9s8d7f6g5h4j3k2l1","content":"Meeting with John","time":"2023-10-26 09:00:00","location":"coffee shop on Main Street"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/96",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me delete my account?",
    requirement: "Can you help me delete my account?",
    task: "User: Can you help me delete my account?\nAI: Sure, I can definitely help with that. Before proceeding with the deletion, can you please provide me your authentication details?\nUser: username - user1, password - user1pass\nAI: For authentication, I need to get your user token. Please provide me with your email address and current password.",
    toolNames: ["DeleteAccount", "GetUserToken"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "GetUserToken", args: {"username":"user1","password":"user1pass"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/97",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me delete my account?",
    requirement: "Can you help me delete my account?",
    task: "User: Can you help me delete my account?\nAI: Sure, I can definitely help with that. Before proceeding with the deletion, can you please provide me your authentication details?\nUser: username - user1, password - user1pass\nAI: For authentication, I need to get your user token. Please provide me with your email address and current password.\nAI: Great! Now that I have your user token, I can proceed with deleting your account. Are you sure you want to proceed with the deletion?\nUser: Yes, I am sure.",
    toolNames: ["DeleteAccount", "GetUserToken"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "DeleteAccount", args: {"token":"n9m8k7j6h5g4f3d2s1a0"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/98",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me record my blood pressure and heart rate?",
    requirement: "Can you help me record my blood pressure and heart rate?",
    task: "User: Can you help me record my blood pressure and heart rate?\nAI: Sure, I can help with that. What is your user ID and the time of the health data?\nUser: My user ID is 12345 and the time is 2023-11-12 10:00:00.\nAI: Alright. What are your blood pressure and heart rate readings?\nUser: My blood pressure is 120/80 and heart rate is 80.\nAI: Great. Let me call the RecordHealthData API to record your health data.",
    toolNames: ["RecordHealthData"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "RecordHealthData", args: {"user_id":"12345","time":"2023-11-12 10:00:00","health_data":"[{"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/99",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me modify an alarm for user3 at 2023-03-24 09:00:00?",
    requirement: "Can you help me modify an alarm for user3 at 2023-03-24 09:00:00?",
    task: "User: Can you help me modify an alarm for user3 at 2023-03-24 09:00:00?\nAI: Sure, to modify an alarm, I need to authenticate the user. Can you please provide me with the credentials for user3?\nUser: The credentials are username(user3) and password(user3pass).\nAI: Thank you, let me authenticate the user...",
    toolNames: ["ModifyAlarm", "GetUserToken", "AddAgenda"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "GetUserToken", args: {"username":"user3","password":"user3pass"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/100",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me modify an alarm for user3 at 2023-03-24 09:00:00?",
    requirement: "Can you help me modify an alarm for user3 at 2023-03-24 09:00:00?",
    task: "User: Can you help me modify an alarm for user3 at 2023-03-24 09:00:00?\nAI: Sure, to modify an alarm, I need to authenticate the user. Can you please provide me with the credentials for user3?\nUser: The credentials are username(user3) and password(user3pass).\nAI: Thank you, let me authenticate the user...\nAI: User authenticated. Now, please specify the new time for the alarm.\nUser: The new time is 2023-03-24 10:00:00.\nAI: Okay, modifying alarm...",
    toolNames: ["ModifyAlarm", "GetUserToken", "AddAgenda"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "ModifyAlarm", args: {"token":"p9o8i7u6y5t4r3e2w1q","from_time":"2023-03-24 09:00:00","to_time":"2023-03-24 10:00:00"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/101",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me modify an alarm for user3 at 2023-03-24 09:00:00?",
    requirement: "Can you help me modify an alarm for user3 at 2023-03-24 09:00:00?",
    task: "User: Can you help me modify an alarm for user3 at 2023-03-24 09:00:00?\nAI: Sure, to modify an alarm, I need to authenticate the user. Can you please provide me with the credentials for user3?\nUser: The credentials are username(user3) and password(user3pass).\nAI: Thank you, let me authenticate the user...\nAI: User authenticated. Now, please specify the new time for the alarm.\nUser: The new time is 2023-03-24 10:00:00.\nAI: Okay, modifying alarm...\nAI: Alarm modified successfully.\nUser: Can you please add an agenda for user3 on 2023-03-24 14:00:00?\nAI: Sure. Now, please provide me with the agenda content and location.\nUser: The content is \"Lunch with friends\" and location is \"Restaurant X\".\nAI: Great! Adding agenda...",
    toolNames: ["ModifyAlarm", "GetUserToken", "AddAgenda"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "AddAgenda", args: {"token":"p9o8i7u6y5t4r3e2w1q","content":"Lunch with friends","time":"2023-03-24 14:00:00","location":"Restaurant X"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/102",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you please tell me the stock price of SQ on March 14th, 2022?",
    requirement: "Can you please tell me the stock price of SQ on March 14th, 2022?",
    task: "User: Can you please tell me the stock price of SQ on March 14th, 2022?\nAI: Sure, let me check that for you.",
    toolNames: ["QueryStock"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "QueryStock", args: {"stock_code":"SQ","date":"2022-03-14"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/103",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me open a bank account?",
    requirement: "Can you help me open a bank account?",
    task: "User: Can you help me open a bank account?\nAI: Sure, I can help you with that. What account identifier do you want to use?\nUser: I want to use \"johnsmith123\".\nAI: What password do you want to use for this account?\nUser: \"p@ssw0rd\"\nAI: And finally, what is your name?\nUser: \"John Smith\"",
    toolNames: ["OpenBankAccount", "QueryStock", "QueryBalance", "GetUserToken"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "OpenBankAccount", args: {"account":"johnsmith123","password":"p@ssw0rd","name":"John Smith"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/104",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me open a bank account?",
    requirement: "Can you help me open a bank account?",
    task: "User: Can you help me open a bank account?\nAI: Sure, I can help you with that. What account identifier do you want to use?\nUser: I want to use \"johnsmith123\".\nAI: What password do you want to use for this account?\nUser: \"p@ssw0rd\"\nAI: And finally, what is your name?\nUser: \"John Smith\"\nAI: Your account has been created successfully. How else may I assist you?\nUser: Can you tell me the stock price for AAPL on January 3rd, 2023?\nAI: The stock price of AAPL on January 3rd, 2023 is not available. However, I can tell you the stock price on January 3rd, 2022 if you want?\nUser: Yes, please.",
    toolNames: ["OpenBankAccount", "QueryStock", "QueryBalance", "GetUserToken"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "QueryStock", args: {"stock_code":"AAPL","date":"2022-01-03"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/105",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me open a bank account?",
    requirement: "Can you help me open a bank account?",
    task: "User: Can you help me open a bank account?\nAI: Sure, I can help you with that. What account identifier do you want to use?\nUser: I want to use \"johnsmith123\".\nAI: What password do you want to use for this account?\nUser: \"p@ssw0rd\"\nAI: And finally, what is your name?\nUser: \"John Smith\"\nAI: Your account has been created successfully. How else may I assist you?\nUser: Can you tell me the stock price for AAPL on January 3rd, 2023?\nAI: The stock price of AAPL on January 3rd, 2023 is not available. However, I can tell you the stock price on January 3rd, 2022 if you want?\nUser: Yes, please.\nAI: The stock price of AAPL on January 3rd, 2022 was $184.5. How can I assist you further?\nUser: Can you tell me my account balance?\nAI: To retrieve your account balance, I need to authenticate you. Please provide me with your username and password.\nUser: My username is \"JohnDoe\" and my password is \"pass123\".",
    toolNames: ["OpenBankAccount", "QueryStock", "QueryBalance", "GetUserToken"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "GetUserToken", args: {"username":"JohnDoe","password":"pass123"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/106",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me open a bank account?",
    requirement: "Can you help me open a bank account?",
    task: "User: Can you help me open a bank account?\nAI: Sure, I can help you with that. What account identifier do you want to use?\nUser: I want to use \"johnsmith123\".\nAI: What password do you want to use for this account?\nUser: \"p@ssw0rd\"\nAI: And finally, what is your name?\nUser: \"John Smith\"\nAI: Your account has been created successfully. How else may I assist you?\nUser: Can you tell me the stock price for AAPL on January 3rd, 2023?\nAI: The stock price of AAPL on January 3rd, 2023 is not available. However, I can tell you the stock price on January 3rd, 2022 if you want?\nUser: Yes, please.\nAI: The stock price of AAPL on January 3rd, 2022 was $184.5. How can I assist you further?\nUser: Can you tell me my account balance?\nAI: To retrieve your account balance, I need to authenticate you. Please provide me with your username and password.\nUser: My username is \"JohnDoe\" and my password is \"pass123\".\nAI: Authenticated. Now I can check your account balance.",
    toolNames: ["OpenBankAccount", "QueryStock", "QueryBalance", "GetUserToken"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "QueryBalance", args: {"token":"a9s8d7f6g5h4j3k2l1"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/107",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you please help me query a reminder for \"Attend meeting\" on March…",
    requirement: "Can you please help me query a reminder for \"Attend meeting\" on March 18th, 2023 at 10:30am?",
    task: "User: Can you please help me query a reminder for \"Attend meeting\" on March 18th, 2023 at 10:30am?\nAI: Sure, I can help you with that. To query a reminder, I need your token, which is a security code that confirms your identity. Can you provide me with your username and password?\nUser: Yes, my username is \"newuser\" and my password is \"newpass\".\nAI: Thank you. Let me retrieve your token.",
    toolNames: ["QueryReminder", "GetUserToken"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "GetUserToken", args: {"username":"newuser","password":"newpass"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/108",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you please help me query a reminder for \"Attend meeting\" on March…",
    requirement: "Can you please help me query a reminder for \"Attend meeting\" on March 18th, 2023 at 10:30am?",
    task: "User: Can you please help me query a reminder for \"Attend meeting\" on March 18th, 2023 at 10:30am?\nAI: Sure, I can help you with that. To query a reminder, I need your token, which is a security code that confirms your identity. Can you provide me with your username and password?\nUser: Yes, my username is \"newuser\" and my password is \"newpass\".\nAI: Thank you. Let me retrieve your token.\nAI: Alright, I found your token. Now, please tell me the exact date and time of the meeting.\nUser: March 18th, 2023 at 10:30am.\nAI: Great, and what's the content of the reminder?\nUser: \"Attend meeting\".\nAI: Perfect. Let me check if the reminder exists.",
    toolNames: ["QueryReminder", "GetUserToken"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "QueryReminder", args: {"token":"l9k8j7h6g5f4d3s2a1","content":"Attend meeting","time":"2023-03-18 10:30:00"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/109",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you record my health data?",
    requirement: "Can you record my health data?",
    task: "User: Can you record my health data?\nAI: Sure, what is your user ID?\nUser: My user ID is 12345.\nAI: What is the date and time of your health data?\nUser: It was on July 10th, 2023 at 9:15 AM.\nAI: What kind of health data would you like to record?\nUser: My blood pressure was 140/90 and my heart rate was 85 bpm.",
    toolNames: ["EmergencyKnowledge", "AppointmentRegistration", "RecordHealthData"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "RecordHealthData", args: {"user_id":"12345","time":"2023-07-10 09:15:00","health_data":"[{"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/110",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you record my health data?",
    requirement: "Can you record my health data?",
    task: "User: Can you record my health data?\nAI: Sure, what is your user ID?\nUser: My user ID is 12345.\nAI: What is the date and time of your health data?\nUser: It was on July 10th, 2023 at 9:15 AM.\nAI: What kind of health data would you like to record?\nUser: My blood pressure was 140/90 and my heart rate was 85 bpm.\nAI: Your health data has been recorded.\nUser: Can you help me register for an appointment at the hospital?\nAI: Sure, what is your name?\nUser: My name is John Smith.\nAI: What is the name of the doctor you want to see?\nUser: I want to see Dr. Johnson.\nAI: What date would you like to make the appointment for?\nUser: Can I make the appointment for August 15th, 2023?",
    toolNames: ["EmergencyKnowledge", "AppointmentRegistration", "RecordHealthData"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "AppointmentRegistration", args: {"patient_name":"John Smith","date":"2023-08-15","doctor_name":"Dr. Johnson"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/111",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you record my health data?",
    requirement: "Can you record my health data?",
    task: "User: Can you record my health data?\nAI: Sure, what is your user ID?\nUser: My user ID is 12345.\nAI: What is the date and time of your health data?\nUser: It was on July 10th, 2023 at 9:15 AM.\nAI: What kind of health data would you like to record?\nUser: My blood pressure was 140/90 and my heart rate was 85 bpm.\nAI: Your health data has been recorded.\nUser: Can you help me register for an appointment at the hospital?\nAI: Sure, what is your name?\nUser: My name is John Smith.\nAI: What is the name of the doctor you want to see?\nUser: I want to see Dr. Johnson.\nAI: What date would you like to make the appointment for?\nUser: Can I make the appointment for August 15th, 2023?\nAI: Your appointment has been registered. Your appointment ID is 54752427.\nUser: I have a fever, can you tell me what it might be?\nAI: Sure, let me check.",
    toolNames: ["EmergencyKnowledge", "AppointmentRegistration", "RecordHealthData"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "EmergencyKnowledge", args: {"symptom":"fever"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/112",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you please check my account balance?",
    requirement: "Can you please check my account balance?",
    task: "User: Can you please check my account balance?\nAI: Sure, I can help you with that. I just need your token. Do you have your token with you?\nUser: No, I don't have it.\nAI: That's alright. I can get your token for you. Can you please confirm your username, password, and email address?\nUser: My username is user2, password is user2pass, and email is user2@example.com.",
    toolNames: ["OpenBankAccount", "QueryStock", "QueryBalance", "GetUserToken"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "GetUserToken", args: {"username":"user2","password":"user2pass"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/113",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you please check my account balance?",
    requirement: "Can you please check my account balance?",
    task: "User: Can you please check my account balance?\nAI: Sure, I can help you with that. I just need your token. Do you have your token with you?\nUser: No, I don't have it.\nAI: That's alright. I can get your token for you. Can you please confirm your username, password, and email address?\nUser: My username is user2, password is user2pass, and email is user2@example.com.\nAI: Thank you for confirming your information. I have retrieved your token. Now, can you please confirm the age, city, and balance on your account?\nUser: My age is 28, I live in San Diego, and the balance on my account is $215.66.",
    toolNames: ["OpenBankAccount", "QueryStock", "QueryBalance", "GetUserToken"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "QueryBalance", args: {"token":"o9i8u7y6t5r4e3w2q1"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/114",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you please check my account balance?",
    requirement: "Can you please check my account balance?",
    task: "User: Can you please check my account balance?\nAI: Sure, I can help you with that. I just need your token. Do you have your token with you?\nUser: No, I don't have it.\nAI: That's alright. I can get your token for you. Can you please confirm your username, password, and email address?\nUser: My username is user2, password is user2pass, and email is user2@example.com.\nAI: Thank you for confirming your information. I have retrieved your token. Now, can you please confirm the age, city, and balance on your account?\nUser: My age is 28, I live in San Diego, and the balance on my account is $215.66.\nAI: Thank you. Your current balance is $215.66. Is there anything else I can help you with?\nUser: Can you check the stock price of TSLA on March 1st, 2022?\nAI: Certainly! I just need TSLA's stock code and the desired date.",
    toolNames: ["OpenBankAccount", "QueryStock", "QueryBalance", "GetUserToken"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "QueryStock", args: {"stock_code":"TSLA","date":"2022-03-01"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/115",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you please check my account balance?",
    requirement: "Can you please check my account balance?",
    task: "User: Can you please check my account balance?\nAI: Sure, I can help you with that. I just need your token. Do you have your token with you?\nUser: No, I don't have it.\nAI: That's alright. I can get your token for you. Can you please confirm your username, password, and email address?\nUser: My username is user2, password is user2pass, and email is user2@example.com.\nAI: Thank you for confirming your information. I have retrieved your token. Now, can you please confirm the age, city, and balance on your account?\nUser: My age is 28, I live in San Diego, and the balance on my account is $215.66.\nAI: Thank you. Your current balance is $215.66. Is there anything else I can help you with?\nUser: Can you check the stock price of TSLA on March 1st, 2022?\nAI: Certainly! I just need TSLA's stock code and the desired date.\nAI: According to my sources, TSLA's stock price on March 1st, 2022 was $984.20. Is there anything else I can help you with?\nUser: Yes, I would like to open a new bank account.\nAI: Great! I can assist you with that. What would you like your account details to be? Please provide me with a desired username, password, and account holder name.\nUser: My desired username is user3, my password is user3pass, and my account holder name is John Smith.",
    toolNames: ["OpenBankAccount", "QueryStock", "QueryBalance", "GetUserToken"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "OpenBankAccount", args: {"account":"user3","password":"user3pass","name":"John Smith"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/116",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me change my password?",
    requirement: "Can you help me change my password?",
    task: "User: Can you help me change my password?\nAI: Sure, I can assist you with that. To change your password, I need your old password and the new password you would like to use. Do you have that information?\nUser: Yes, my old password is \"user2pass\" and my new password is \"newpassword\".\nAI: Okay, to perform this task, I need to authenticate you. Can you please provide me with your username as well?\nUser: Sure, my username is \"user2\".",
    toolNames: ["ModifyPassword", "GetUserToken"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "GetUserToken", args: {"username":"user2","password":"user2pass"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/117",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me change my password?",
    requirement: "Can you help me change my password?",
    task: "User: Can you help me change my password?\nAI: Sure, I can assist you with that. To change your password, I need your old password and the new password you would like to use. Do you have that information?\nUser: Yes, my old password is \"user2pass\" and my new password is \"newpassword\".\nAI: Okay, to perform this task, I need to authenticate you. Can you please provide me with your username as well?\nUser: Sure, my username is \"user2\".\nAI: Thanks for the information. I have authenticated you successfully. Now, let me change your password.",
    toolNames: ["ModifyPassword", "GetUserToken"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "ModifyPassword", args: {"token":"o9i8u7y6t5r4e3w2q1","old_password":"user2pass","new_password":"newpassword"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/118",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me reschedule my appointment with Dr. Smith on October 1…",
    requirement: "Can you help me reschedule my appointment with Dr. Smith on October 10th?",
    task: "User: Can you help me reschedule my appointment with Dr. Smith on October 10th?\nAI: Sure! To do that, I'll need the appointment ID and the new appointment date and doctor's name. Do you have that information?\nUser: Yes, the appointment ID is 90123456 and the new appointment is with Dr. Lee on October 12th.\nAI: Great! Let me check with the system to see if that's possible.",
    toolNames: ["ModifyRegistration"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "ModifyRegistration", args: {"appointment_id":"90123456","new_appointment_date":"2023-10-12","new_appointment_doctor":"Dr. Lee"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/119",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you tell me what happened on this day in history?",
    requirement: "Can you tell me what happened on this day in history?",
    task: "User: Can you tell me what happened on this day in history?\nAI: Sure, what specific day are you interested in?\nUser: Today's date, December 10th.\nAI: Ok, let me check.",
    toolNames: ["QueryHistoryToday"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "QueryHistoryToday", args: {"date":"12-10"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/120",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me register on this app?",
    requirement: "Can you help me register on this app?",
    task: "User: Can you help me register on this app?\nAI: Sure. Please provide your username, password, and email address.\nUser: My username is xyz, password is abc123, and email is xyz@example.com.",
    toolNames: ["RegisterUser"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "RegisterUser", args: {"username":"xyz","password":"abc123","email":"xyz@example.com"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/121",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you tell me the stock price of NFLX on 2022-02-21?",
    requirement: "Can you tell me the stock price of NFLX on 2022-02-21?",
    task: "User: Can you tell me the stock price of NFLX on 2022-02-21?\nAI: Sure! I can help you with that.",
    toolNames: ["QueryStock", "GetUserToken"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "QueryStock", args: {"stock_code":"NFLX","date":"2022-02-21"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/122",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you tell me the stock price of NFLX on 2022-02-21?",
    requirement: "Can you tell me the stock price of NFLX on 2022-02-21?",
    task: "User: Can you tell me the stock price of NFLX on 2022-02-21?\nAI: Sure! I can help you with that.\nAI: According to my sources, on 2022-02-21, the stock price of NFLX was 614.8 USD.\nUser: Thanks. Can you also check my balance?\nAI: Of course! For that, I need your token.\nUser: My username is user3 and password is user3pass.",
    toolNames: ["QueryStock", "GetUserToken"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "GetUserToken", args: {"username":"user3","password":"user3pass"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/123",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you please delete my reminder to call the dentist on March 16th a…",
    requirement: "Can you please delete my reminder to call the dentist on March 16th at 4:30 pm?",
    task: "User: Can you please delete my reminder to call the dentist on March 16th at 4:30 pm?\nAI: Sure, let me handle that for you. To delete the reminder, I need your token. Could you please provide your username and password?\nUser: My username is user4 and my password is user4pass.\nAI: Thank you.",
    toolNames: ["DeleteReminder", "GetUserToken"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "GetUserToken", args: {"username":"user4","password":"user4pass"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/124",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you please delete my reminder to call the dentist on March 16th a…",
    requirement: "Can you please delete my reminder to call the dentist on March 16th at 4:30 pm?",
    task: "User: Can you please delete my reminder to call the dentist on March 16th at 4:30 pm?\nAI: Sure, let me handle that for you. To delete the reminder, I need your token. Could you please provide your username and password?\nUser: My username is user4 and my password is user4pass.\nAI: Thank you.\nAI: Got it. Now, to delete the reminder, I need the reminder's content and time. What was the description of the reminder?\nUser: It was to call the dentist.\nAI: And what was the time for the reminder?\nUser: March 16th at 4:30 pm.",
    toolNames: ["DeleteReminder", "GetUserToken"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "DeleteReminder", args: {"token":"q9w8e7r6t5y4u3i2o1","content":"Call dentist","time":"2023-03-16 16:30:00"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/125",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me delete an alarm set for March 16th at 7am?",
    requirement: "Can you help me delete an alarm set for March 16th at 7am?",
    task: "User: Can you help me delete an alarm set for March 16th at 7am?\nAI: Sure. What is your username and password?\nUser: My username is JohnDoe and my password is pass123.",
    toolNames: ["DeleteAlarm", "GetUserToken"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "GetUserToken", args: {"username":"JohnDoe","password":"pass123"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/126",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me delete an alarm set for March 16th at 7am?",
    requirement: "Can you help me delete an alarm set for March 16th at 7am?",
    task: "User: Can you help me delete an alarm set for March 16th at 7am?\nAI: Sure. What is your username and password?\nUser: My username is JohnDoe and my password is pass123.\nAI: I have generated a token for you. What is the time of the alarm?\nUser: The time of the alarm is 2023-03-16 07:00:00.",
    toolNames: ["DeleteAlarm", "GetUserToken"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "DeleteAlarm", args: {"token":"a9s8d7f6g5h4j3k2l1","time":"2023-03-16 07:00:00"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/127",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you please tell me the current date?",
    requirement: "Can you please tell me the current date?",
    task: "User: Can you please tell me the current date?\nAI: Sure, I can help you with that.",
    toolNames: ["GetToday"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "GetToday", args: {} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/128",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me open a bank account?",
    requirement: "Can you help me open a bank account?",
    task: "User: Can you help me open a bank account?\nAI: Sure, I can help you with that. What account number would you like to use?\nUser: 12345678\nAI: And what password would you like to use for this account?\nUser: p@ssw0rd123!\nAI: Lastly, what is your full name?\nUser: John Smith",
    toolNames: ["OpenBankAccount"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "OpenBankAccount", args: {"account":"12345678","password":"p@ssw0rd123!","name":"John Smith"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/129",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you give me the definition of the word \"resilience\"?",
    requirement: "Can you give me the definition of the word \"resilience\"?",
    task: "User: Can you give me the definition of the word \"resilience\"?\nAI: Sure, let me check.",
    toolNames: ["Dictionary"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "Dictionary", args: {"keyword":"resilience"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/130",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you cancel a timer for my smart device?",
    requirement: "Can you cancel a timer for my smart device?",
    task: "User: Can you cancel a timer for my smart device?\nAI: Sure, I can help you with that. What's the ID of your device?\nUser: It's 10000025.\nAI: When is the device scheduled to switch on or off?\nUser: It's supposed to turn on on March 19th 2023 at 9:30 AM.\nAI: Alright. Let me cancel the timed switch for you.",
    toolNames: ["CancelTimedSwitch"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "CancelTimedSwitch", args: {"device_id":"10000025","time":"2023-03-19 09:30:00"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/131",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you tell me what happened on April 21st in history?",
    requirement: "Can you tell me what happened on April 21st in history?",
    task: "User: Can you tell me what happened on April 21st in history?\nAI: Sure, would you like me to query the history for that date?",
    toolNames: ["QueryHistoryToday", "Calculator"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "QueryHistoryToday", args: {"date":"04-21"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/132",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you tell me what happened on April 21st in history?",
    requirement: "Can you tell me what happened on April 21st in history?",
    task: "User: Can you tell me what happened on April 21st in history?\nAI: Sure, would you like me to query the history for that date?\nAI: On April 21st, in 1903, the New York Yankees played their first game in franchise history. Romulus, the founder and first king of Rome, was carried off to heaven by a whirlwind on this day. Queen Elizabeth II was born on this day in London. Actor Anthony Quinn was also born on this day in Chihuahua, Mexico. King Henry VIII of England died on this day at the age of 55.\nUser: Can you calculate (4*2)/(1+3)?\nAI: Sure, here is the result of your calculation:",
    toolNames: ["QueryHistoryToday", "Calculator"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "Calculator", args: {"formula":"(4*2)/(1+3)"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/133",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you please give me the health data for user A12345 from 2023-03-0…",
    requirement: "Can you please give me the health data for user A12345 from 2023-03-01 to 2023-03-31?",
    task: "User: Can you please give me the health data for user A12345 from 2023-03-01 to 2023-03-31?\nAI: Sure, let me check.",
    toolNames: ["QueryHealthData"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "QueryHealthData", args: {"user_id":"A12345","start_time":"2023-03-01 00:00:00","end_time":"2023-03-31 23:59:59"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/134",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you cancel my appointment on August 5th with Dr. Chen under the n…",
    requirement: "Can you cancel my appointment on August 5th with Dr. Chen under the name Sarah Johnson? My appointment ID is 78901234.",
    task: "User: Can you cancel my appointment on August 5th with Dr. Chen under the name Sarah Johnson? My appointment ID is 78901234.\nAI: Sure, I can help you with that.",
    toolNames: ["RecordHealthData", "CancelRegistration", "QueryRegistration"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "CancelRegistration", args: {"appointment_id":"78901234"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/135",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you cancel my appointment on August 5th with Dr. Chen under the n…",
    requirement: "Can you cancel my appointment on August 5th with Dr. Chen under the name Sarah Johnson? My appointment ID is 78901234.",
    task: "User: Can you cancel my appointment on August 5th with Dr. Chen under the name Sarah Johnson? My appointment ID is 78901234.\nAI: Sure, I can help you with that.\nAI: Your appointment with Dr. Chen on August 5th under the name Sarah Johnson has been canceled. The status of cancellation is [status].\nUser: Can you record my health data for user ID 123456 on July 15 2023 at 9:00 AM? My blood pressure is 120/80 and my heart rate is 80 bpm.\nAI: Yes, I can assist you with that.",
    toolNames: ["RecordHealthData", "CancelRegistration", "QueryRegistration"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "RecordHealthData", args: {"user_id":"123456","time":"2023-07-15 09:00:00","health_data":"[{"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/136",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you cancel my appointment on August 5th with Dr. Chen under the n…",
    requirement: "Can you cancel my appointment on August 5th with Dr. Chen under the name Sarah Johnson? My appointment ID is 78901234.",
    task: "User: Can you cancel my appointment on August 5th with Dr. Chen under the name Sarah Johnson? My appointment ID is 78901234.\nAI: Sure, I can help you with that.\nAI: Your appointment with Dr. Chen on August 5th under the name Sarah Johnson has been canceled. The status of cancellation is [status].\nUser: Can you record my health data for user ID 123456 on July 15 2023 at 9:00 AM? My blood pressure is 120/80 and my heart rate is 80 bpm.\nAI: Yes, I can assist you with that.\nAI: Your health data has been recorded successfully.\nUser: Can you check my appointment on May 20th 2023 under the name Jane Smith?\nAI: Sure, I can help you with that.",
    toolNames: ["RecordHealthData", "CancelRegistration", "QueryRegistration"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "QueryRegistration", args: {"patient_name":"Jane Smith","date":"2023-05-20"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/137",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you record my health data?",
    requirement: "Can you record my health data?",
    task: "User: Can you record my health data?\nAI: Sure, I can do that for you. What's your user ID?\nUser: My user ID is 1234.\nAI: Okay, what's the time of your health data?\nUser: It's on August 15, 2023 at 9:30 AM.\nAI: What health data do you want to record?\nUser: I want to record my blood pressure and heart rate.\nAI: Alright, I'm recording your health data now.",
    toolNames: ["EmergencyKnowledge", "AppointmentRegistration", "RecordHealthData"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "RecordHealthData", args: {"user_id":"1234","time":"2023-08-15 09:30:00","health_data":"[{"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/138",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you record my health data?",
    requirement: "Can you record my health data?",
    task: "User: Can you record my health data?\nAI: Sure, I can do that for you. What's your user ID?\nUser: My user ID is 1234.\nAI: Okay, what's the time of your health data?\nUser: It's on August 15, 2023 at 9:30 AM.\nAI: What health data do you want to record?\nUser: I want to record my blood pressure and heart rate.\nAI: Alright, I'm recording your health data now.\nAI: Your health data has been recorded successfully.\nUser: I need to register an appointment.\nAI: Of course. What's your name?\nUser: My name is John.\nAI: Who do you want to make an appointment with?\nUser: I want to make an appointment with Dr. Smith.\nAI: And on what date would you like to schedule the appointment?\nUser: September 5, 2023.\nAI: All right, your appointment with Dr. Smith on September 5, 2023 has been scheduled.",
    toolNames: ["EmergencyKnowledge", "AppointmentRegistration", "RecordHealthData"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "AppointmentRegistration", args: {"patient_name":"John","date":"2023-09-05","doctor_name":"Dr. Smith"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/139",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you record my health data?",
    requirement: "Can you record my health data?",
    task: "User: Can you record my health data?\nAI: Sure, I can do that for you. What's your user ID?\nUser: My user ID is 1234.\nAI: Okay, what's the time of your health data?\nUser: It's on August 15, 2023 at 9:30 AM.\nAI: What health data do you want to record?\nUser: I want to record my blood pressure and heart rate.\nAI: Alright, I'm recording your health data now.\nAI: Your health data has been recorded successfully.\nUser: I need to register an appointment.\nAI: Of course. What's your name?\nUser: My name is John.\nAI: Who do you want to make an appointment with?\nUser: I want to make an appointment with Dr. Smith.\nAI: And on what date would you like to schedule the appointment?\nUser: September 5, 2023.\nAI: All right, your appointment with Dr. Smith on September 5, 2023 has been scheduled.\nAI: Your appointment ID is 34163717.\nUser: I'm feeling ill and I'm experiencing fever. Can you help me identify my symptoms?\nAI: Of course. Let me look that up for you.",
    toolNames: ["EmergencyKnowledge", "AppointmentRegistration", "RecordHealthData"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "EmergencyKnowledge", args: {"symptom":"fever"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/140",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you tell me the stock price of AMZN on March 11, 2022?",
    requirement: "Can you tell me the stock price of AMZN on March 11, 2022?",
    task: "User: Can you tell me the stock price of AMZN on March 11, 2022?\nAI: Sure, let me check that for you.",
    toolNames: ["OpenBankAccount", "QueryStock", "QueryBalance", "GetUserToken"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "QueryStock", args: {"stock_code":"AMZN","date":"2022-03-11"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/141",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you tell me the stock price of AMZN on March 11, 2022?",
    requirement: "Can you tell me the stock price of AMZN on March 11, 2022?",
    task: "User: Can you tell me the stock price of AMZN on March 11, 2022?\nAI: Sure, let me check that for you.\nAI: The stock price of AMZN on March 11, 2022 was 3012.7 dollars.\nUser: I want to open a bank account.\nAI: Alright, I can help you with that. What account identifier would you like to use?\nUser: My account identifier will be user4.\nAI: Great! What would you like your password to be?\nUser: I would like my password to be user4pass.\nAI: And what is your name?\nUser: My name is John.",
    toolNames: ["OpenBankAccount", "QueryStock", "QueryBalance", "GetUserToken"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "OpenBankAccount", args: {"account":"user4","password":"user4pass","name":"John"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/142",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you tell me the stock price of AMZN on March 11, 2022?",
    requirement: "Can you tell me the stock price of AMZN on March 11, 2022?",
    task: "User: Can you tell me the stock price of AMZN on March 11, 2022?\nAI: Sure, let me check that for you.\nAI: The stock price of AMZN on March 11, 2022 was 3012.7 dollars.\nUser: I want to open a bank account.\nAI: Alright, I can help you with that. What account identifier would you like to use?\nUser: My account identifier will be user4.\nAI: Great! What would you like your password to be?\nUser: I would like my password to be user4pass.\nAI: And what is your name?\nUser: My name is John.\nAI: Your account has been successfully created.\nUser: Could you check my account balance please?",
    toolNames: ["OpenBankAccount", "QueryStock", "QueryBalance", "GetUserToken"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "GetUserToken", args: {"username":"user4","password":"user4pass"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/143",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you tell me the stock price of AMZN on March 11, 2022?",
    requirement: "Can you tell me the stock price of AMZN on March 11, 2022?",
    task: "User: Can you tell me the stock price of AMZN on March 11, 2022?\nAI: Sure, let me check that for you.\nAI: The stock price of AMZN on March 11, 2022 was 3012.7 dollars.\nUser: I want to open a bank account.\nAI: Alright, I can help you with that. What account identifier would you like to use?\nUser: My account identifier will be user4.\nAI: Great! What would you like your password to be?\nUser: I would like my password to be user4pass.\nAI: And what is your name?\nUser: My name is John.\nAI: Your account has been successfully created.\nUser: Could you check my account balance please?",
    toolNames: ["OpenBankAccount", "QueryStock", "QueryBalance", "GetUserToken"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "QueryBalance", args: {"token":"q9w8e7r6t5y4u3i2o1"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/144",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you tell me the stock price of AMZN on March 11, 2022?",
    requirement: "Can you tell me the stock price of AMZN on March 11, 2022?",
    task: "User: Can you tell me the stock price of AMZN on March 11, 2022?\nAI: Sure, let me check that for you.\nAI: The stock price of AMZN on March 11, 2022 was 3012.7 dollars.\nUser: I want to open a bank account.\nAI: Alright, I can help you with that. What account identifier would you like to use?\nUser: My account identifier will be user4.\nAI: Great! What would you like your password to be?\nUser: I would like my password to be user4pass.\nAI: And what is your name?\nUser: My name is John.\nAI: Your account has been successfully created.\nUser: Could you check my account balance please?",
    toolNames: ["OpenBankAccount", "QueryStock", "QueryBalance", "GetUserToken"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "QueryBalance", args: {"token":"q9w8e7r6t5y4u3i2o1"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/145",
    level: 1,
    category: "Level 1 - single call",
    title: "What is the stock price of SQ on March 14th, 2022?",
    requirement: "What is the stock price of SQ on March 14th, 2022?",
    task: "User: What is the stock price of SQ on March 14th, 2022?\nAI: Let me check for you.",
    toolNames: ["QueryStock"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "QueryStock", args: {"stock_code":"SQ","date":"2022-03-14"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/146",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me check a meeting on March 20th from 2 PM to 4 PM in Co…",
    requirement: "Can you help me check a meeting on March 20th from 2 PM to 4 PM in Conference Room A for a Sales Meeting with John Smith and Jane Doe attending?",
    task: "User: Can you help me check a meeting on March 20th from 2 PM to 4 PM in Conference Room A for a Sales Meeting with John Smith and Jane Doe attending?\nAI: Sure, I can help you with that. May I have your username and password for authentication?\nUser: My username is JohnDoe and my password is pass123.",
    toolNames: ["QueryMeeting", "GetUserToken"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "GetUserToken", args: {"username":"JohnDoe","password":"pass123"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/147",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me check a meeting on March 20th from 2 PM to 4 PM in Co…",
    requirement: "Can you help me check a meeting on March 20th from 2 PM to 4 PM in Conference Room A for a Sales Meeting with John Smith and Jane Doe attending?",
    task: "User: Can you help me check a meeting on March 20th from 2 PM to 4 PM in Conference Room A for a Sales Meeting with John Smith and Jane Doe attending?\nAI: Sure, I can help you with that. May I have your username and password for authentication?\nUser: My username is JohnDoe and my password is pass123.\nAI: Authenticated. Now, let me check the meeting for you.",
    toolNames: ["QueryMeeting", "GetUserToken"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "QueryMeeting", args: {"token":"a9s8d7f6g5h4j3k2l1","meeting_topic":"Sales Meeting","start_time":"2023-03-20 14:00:00","end_time":"2023-03-20 16:00:00","location":"Conference Room A","attendees":"["} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/148",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me change my appointment date and doctor?",
    requirement: "Can you help me change my appointment date and doctor?",
    task: "User: Can you help me change my appointment date and doctor?\nAI: Sure, I can help you with that. What's your appointment ID and what's the new date and doctor you want to change it to?\nUser: My appointment ID is 90123456 and I want to change it to October 12th with Dr. Lee.\nAI: Alright, let me make that change for you.",
    toolNames: ["ModifyRegistration"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "ModifyRegistration", args: {"appointment_id":"90123456","new_appointment_date":"2023-10-12","new_appointment_doctor":"Dr. Lee"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/149",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you check my account balance, please?",
    requirement: "Can you check my account balance, please?",
    task: "User: Can you check my account balance, please?\nAI: Sure, may I have your account information for authentication?\nUser: testuser, testpass\nAI: Got it.",
    toolNames: ["OpenBankAccount", "QueryStock", "GetUserToken"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "GetUserToken", args: {"username":"testuser","password":"testpass"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/150",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you check my account balance, please?",
    requirement: "Can you check my account balance, please?",
    task: "User: Can you check my account balance, please?\nAI: Sure, may I have your account information for authentication?\nUser: testuser, testpass\nAI: Got it.\nAI: Your balance is 1935.44. Anything else I can help you with?\nUser: I want to open a new bank account.\nAI: Okay. What should be the account identifier, password, and account holder's name?\nUser: The account identifier is newaccount, the password is newpassword, and the account holder's name is John Doe.\nAI: Sure, I will open a new bank account for you.",
    toolNames: ["OpenBankAccount", "QueryStock", "GetUserToken"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "OpenBankAccount", args: {"account":"newaccount","password":"newpassword","name":"John Doe"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/151",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you check my account balance, please?",
    requirement: "Can you check my account balance, please?",
    task: "User: Can you check my account balance, please?\nAI: Sure, may I have your account information for authentication?\nUser: testuser, testpass\nAI: Got it.\nAI: Your balance is 1935.44. Anything else I can help you with?\nUser: I want to open a new bank account.\nAI: Okay. What should be the account identifier, password, and account holder's name?\nUser: The account identifier is newaccount, the password is newpassword, and the account holder's name is John Doe.\nAI: Sure, I will open a new bank account for you.\nAI: Your account has been created successfully. Anything else I can help you with?\nUser: Can you check the stock price of Netflix on February 16, 2022?\nAI: Sure, what is the stock code of Netflix?",
    toolNames: ["OpenBankAccount", "QueryStock", "GetUserToken"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "QueryStock", args: {"stock_code":"NFLX","date":"2022-02-16"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/152",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me change my account password?",
    requirement: "Can you help me change my account password?",
    task: "User: Can you help me change my account password?\nAI: Sure, I can help with that. Can you confirm your username and old password for authentication?\nUser: My username is user1 and my old password is user1pass.\nAI: Alright. To change your password, I need a token for authentication. Let me retrieve it for you.",
    toolNames: ["ModifyPassword", "GetUserToken"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "GetUserToken", args: {"username":"user1","password":"user1pass"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/153",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me change my account password?",
    requirement: "Can you help me change my account password?",
    task: "User: Can you help me change my account password?\nAI: Sure, I can help with that. Can you confirm your username and old password for authentication?\nUser: My username is user1 and my old password is user1pass.\nAI: Alright. To change your password, I need a token for authentication. Let me retrieve it for you.\nAI: Got it. What would you like your new password to be?\nUser: My new password is newpass123.\nAI: Great.",
    toolNames: ["ModifyPassword", "GetUserToken"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "ModifyPassword", args: {"token":"n9m8k7j6h5g4f3d2s1a0","old_password":"user1pass","new_password":"newpass123"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/154",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you change my appointment?",
    requirement: "Can you change my appointment?",
    task: "User: Can you change my appointment?\nAI: Of course! Please provide me your appointment ID, new date, and new doctor's name.\nUser: My ID is 12345678, I want to reschedule it to May 15 with Dr. Lee.\nAI: Sure!",
    toolNames: ["EmergencyKnowledge", "ModifyRegistration"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "ModifyRegistration", args: {"appointment_id":"12345678","new_appointment_date":"2023-05-15","new_appointment_doctor":"Dr. Lee"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/155",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you change my appointment?",
    requirement: "Can you change my appointment?",
    task: "User: Can you change my appointment?\nAI: Of course! Please provide me your appointment ID, new date, and new doctor's name.\nUser: My ID is 12345678, I want to reschedule it to May 15 with Dr. Lee.\nAI: Sure!\nAI: Your appointment has been rescheduled, and the status of the modification is in the output parameter. Is there anything else I can help you with?\nUser: I'm feeling fatigued, can you give me some information on this symptom?\nAI: Definitely.",
    toolNames: ["EmergencyKnowledge", "ModifyRegistration"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "EmergencyKnowledge", args: {"symptom":"fatigue"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/156",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you tell me the current date?",
    requirement: "Can you tell me the current date?",
    task: "User: Can you tell me the current date?\nAI: Sure, I can do that.",
    toolNames: ["GetToday"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "GetToday", args: {} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/157",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me open a new bank account?",
    requirement: "Can you help me open a new bank account?",
    task: "User: Can you help me open a new bank account?\nAI: Sure, I can help you with that. What account identifier would you like to use?\nUser: My desired account identifier is \"MyNewAccount\"\nAI: Ok, great. What password would you like to use for your new account?\nUser: My password is \"Password123\"\nAI: And finally, what is your name?\nUser: John Smith\nAI: Alright, I will use your inputs to open a new account for you. Please wait a moment while I process your request.",
    toolNames: ["OpenBankAccount"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "OpenBankAccount", args: {"account":"MyNewAccount","password":"Password123","name":"John Smith"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/158",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you search the definition of the word \"plethora\" for me?",
    requirement: "Can you search the definition of the word \"plethora\" for me?",
    task: "User: Can you search the definition of the word \"plethora\" for me?\nAI: Sure, searching for \"plethora\"...",
    toolNames: ["Dictionary"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "Dictionary", args: {"keyword":"plethora"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/159",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you search the definition of the word \"plethora\" for me?",
    requirement: "Can you search the definition of the word \"plethora\" for me?",
    task: "User: Can you search the definition of the word \"plethora\" for me?\nAI: Sure, searching for \"plethora\"...\nAI: Here's what I found: \"a large or excessive amount of something.\" Can I help you with anything else?\nUser: Yes, can you give me the synonyms for \"plethora\"?\nAI: Let me check for synonyms of \"plethora\"...",
    toolNames: ["Dictionary"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "Dictionary", args: {"keyword":"plethora"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/160",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you perform some basic arithmetic calculation for me?",
    requirement: "Can you perform some basic arithmetic calculation for me?",
    task: "User: Can you perform some basic arithmetic calculation for me?\nAI: Sure, what calculation do you want me to perform?\nUser: What is the result of (5+3)*6?",
    toolNames: ["Calculator"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "Calculator", args: {"formula":"(5+3)*6"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/161",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me modify my appointment with Dr. Kim on March 25th, 202…",
    requirement: "Can you help me modify my appointment with Dr. Kim on March 25th, 2023?",
    task: "User: Can you help me modify my appointment with Dr. Kim on March 25th, 2023?\nAI: Sure! Please provide me with your appointment ID, patient name, new appointment date and new appointment doctor.\nUser: My appointment ID is 34567890, patient name is Robert Lee, the new appointment date is April 1st, 2023, and the new doctor is Dr. William.",
    toolNames: ["QueryHealthData", "CancelRegistration", "ModifyRegistration"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "ModifyRegistration", args: {"appointment_id":"34567890","new_appointment_date":"2023-04-01","new_appointment_doctor":"Dr. William"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/162",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me modify my appointment with Dr. Kim on March 25th, 202…",
    requirement: "Can you help me modify my appointment with Dr. Kim on March 25th, 2023?",
    task: "User: Can you help me modify my appointment with Dr. Kim on March 25th, 2023?\nAI: Sure! Please provide me with your appointment ID, patient name, new appointment date and new appointment doctor.\nUser: My appointment ID is 34567890, patient name is Robert Lee, the new appointment date is April 1st, 2023, and the new doctor is Dr. William.\nAI: Your appointment has been modified successfully with Dr. William on April 1st, 2023.\nUser: Can you check my health data?\nAI: Sure! Can you provide me with your user ID and the time span you want to check?\nUser: My user ID is J46801 and I want to check my health data from March 1st, 2023 to March 31st, 2023.",
    toolNames: ["QueryHealthData", "CancelRegistration", "ModifyRegistration"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "QueryHealthData", args: {"user_id":"J46801","start_time":"2023-03-01 00:00:00","end_time":"2023-03-31 23:59:59"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/163",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me modify my appointment with Dr. Kim on March 25th, 202…",
    requirement: "Can you help me modify my appointment with Dr. Kim on March 25th, 2023?",
    task: "User: Can you help me modify my appointment with Dr. Kim on March 25th, 2023?\nAI: Sure! Please provide me with your appointment ID, patient name, new appointment date and new appointment doctor.\nUser: My appointment ID is 34567890, patient name is Robert Lee, the new appointment date is April 1st, 2023, and the new doctor is Dr. William.\nAI: Your appointment has been modified successfully with Dr. William on April 1st, 2023.\nUser: Can you check my health data?\nAI: Sure! Can you provide me with your user ID and the time span you want to check?\nUser: My user ID is J46801 and I want to check my health data from March 1st, 2023 to March 31st, 2023.\nAI: I have retrieved your health data from March 1st, 2023 to March 31st, 2023. Your blood pressure was 140/90, your triglycerides were 130, and your heart rate was 85 on March 11th, 2023 at 2:20 pm.\nUser: Can you help me cancel my appointment on October 10th, 2023 with Dr. Smith?\nAI: Of course! Please provide me with your appointment ID and patient name.\nUser: My appointment ID is 90123456 and the patient name is Olivia Davis.",
    toolNames: ["QueryHealthData", "CancelRegistration", "ModifyRegistration"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "CancelRegistration", args: {"appointment_id":"90123456"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/164",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me cancel a timed switch for one of my smart devices?",
    requirement: "Can you help me cancel a timed switch for one of my smart devices?",
    task: "User: Can you help me cancel a timed switch for one of my smart devices?\nAI: Sure, I can assist you with that. Can you please provide me with the device ID and the time for the switch?\nUser: The device ID is 10000025 and the time is 2023-03-19 09:30:00.",
    toolNames: ["CancelTimedSwitch"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "CancelTimedSwitch", args: {"device_id":"10000025","time":"2023-03-19 09:30:00"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/165",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you delete my gym workout from my schedule for March 16th at 24 H…",
    requirement: "Can you delete my gym workout from my schedule for March 16th at 24 Hour Fitness?",
    task: "User: Can you delete my gym workout from my schedule for March 16th at 24 Hour Fitness?\nAI: Sure, I can help you with that. Can you please provide me with your username and password for authentication?\nUser: My username is JaneSmith and my password is password.\nAI: Thank you, let me authenticate you first.",
    toolNames: ["DeleteAgenda", "GetUserToken"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "GetUserToken", args: {"username":"JaneSmith","password":"password"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/166",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you delete my gym workout from my schedule for March 16th at 24 H…",
    requirement: "Can you delete my gym workout from my schedule for March 16th at 24 Hour Fitness?",
    task: "User: Can you delete my gym workout from my schedule for March 16th at 24 Hour Fitness?\nAI: Sure, I can help you with that. Can you please provide me with your username and password for authentication?\nUser: My username is JaneSmith and my password is password.\nAI: Thank you, let me authenticate you first.\nAI: I have retrieved your token. Now, please give me the date and time of the gym workout you want to delete.\nUser: It was on March 16th.\nAI: And the time?\nUser: The time was 10:00 AM.\nAI: Alright, and the location?\nUser: It was at 24 Hour Fitness.\nAI: Perfect, let me delete that for you.",
    toolNames: ["DeleteAgenda", "GetUserToken"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "DeleteAgenda", args: {"token":"o8i7u6y5t4r3e2w1q0","content":"Gym workout","time":"2023-03-16 10:00:00","location":"24 Hour Fitness"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/167",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you cancel a timed switch for my smart device with ID 10000025 fo…",
    requirement: "Can you cancel a timed switch for my smart device with ID 10000025 for March 19th at 9:30 AM?",
    task: "User: Can you cancel a timed switch for my smart device with ID 10000025 for March 19th at 9:30 AM?\nAI: Sure, I can help you with that.",
    toolNames: ["CancelTimedSwitch"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "CancelTimedSwitch", args: {"device_id":"10000025","time":"2023-03-19 09:30:00"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/168",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you please help me delete my account?",
    requirement: "Can you please help me delete my account?",
    task: "User: Can you please help me delete my account?\nAI: Sure, I can help you with that. To delete your account, I need your authentication token. Do you have it?\nUser: No, I don't have it. Can you help me with that as well?\nAI: Of course. I just need your username, and password to get the token. Can you provide that for me?\nUser: My username is foo and my password is bar.\nAI: Great, I was able to retrieve your token.",
    toolNames: ["DeleteAccount", "GetUserToken"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "GetUserToken", args: {"username":"foo","password":"bar"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/169",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you please help me delete my account?",
    requirement: "Can you please help me delete my account?",
    task: "User: Can you please help me delete my account?\nAI: Sure, I can help you with that. To delete your account, I need your authentication token. Do you have it?\nUser: No, I don't have it. Can you help me with that as well?\nAI: Of course. I just need your username, and password to get the token. Can you provide that for me?\nUser: My username is foo and my password is bar.\nAI: Great, I was able to retrieve your token.",
    toolNames: ["DeleteAccount", "GetUserToken"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "DeleteAccount", args: {"token":"z9x8c7v6b5n4m3q2w1"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/170",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you please help me delete my account?",
    requirement: "Can you please help me delete my account?",
    task: "User: Can you please help me delete my account?\nAI: Sure, I can help you with that. To delete your account, I need your authentication token. Do you have it?\nUser: No, I don't have it. Can you help me with that as well?\nAI: Of course. I just need your username, and password to get the token. Can you provide that for me?\nUser: My username is foo and my password is bar.\nAI: Great, I was able to retrieve your token.",
    toolNames: ["DeleteAccount", "GetUserToken"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "DeleteAccount", args: {"token":"z9x8c7v6b5n4m3q2w1"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/171",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you give me the stock price of AAPL on January 4, 2023?",
    requirement: "Can you give me the stock price of AAPL on January 4, 2023?",
    task: "User: Can you give me the stock price of AAPL on January 4, 2023?\nAI: Sure, I can help you with that. [QueryStock(stock_code='AAPL', date='2023-01-04')]\nAI: The stock price of AAPL on January 4, 2023 is $185.2.\nUser: That's great, thank you. Can you also help me open a bank account?\nAI: Of course! What account identifier would you like to use?\nUser: Let's use \"johnsmith\".\nAI: And what password would you like to use?\nUser: \"password123\".\nAI: Finally, what is your name?\nUser: \"John Smith\".\nAI: Okay, I will create an account with the information you provided.",
    toolNames: ["OpenBankAccount"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "OpenBankAccount", args: {"account":"johnsmith","password":"password123","name":"John Smith"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/172",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me set an alarm for 8 am tomorrow?",
    requirement: "Can you help me set an alarm for 8 am tomorrow?",
    task: "User: Can you help me set an alarm for 8 am tomorrow?\nAI: Sure, to set an alarm, I need to authorize your account. Can you please provide your username and password?\nUser: Sure, my username is foo and password is bar.\nAI: Thank you. Let me get your token.",
    toolNames: ["AddAlarm", "GetUserToken"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "GetUserToken", args: {"username":"foo","password":"bar"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/173",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me set an alarm for 8 am tomorrow?",
    requirement: "Can you help me set an alarm for 8 am tomorrow?",
    task: "User: Can you help me set an alarm for 8 am tomorrow?\nAI: Sure, to set an alarm, I need to authorize your account. Can you please provide your username and password?\nUser: Sure, my username is foo and password is bar.\nAI: Thank you. Let me get your token.\nAI: Okay, I got your token. What time do you want the alarm to be set for?\nUser: 8 am tomorrow. Today is 2021-10-13.\nAI: Okay, I'm setting the alarm.",
    toolNames: ["AddAlarm", "GetUserToken"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "AddAlarm", args: {"token":"z9x8c7v6b5n4m3q2w1","time":"2021-10-14 08:00:00"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/174",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you tell me about any historical events that happened on April 21…",
    requirement: "Can you tell me about any historical events that happened on April 21st?",
    task: "User: Can you tell me about any historical events that happened on April 21st?\nAI: Sure. To clarify, do you want to know about any historical events that happened on April 21st throughout history or just on this day in the past?\nUser: Just on this day in the past.\nAI: Understood.",
    toolNames: ["QueryHistoryToday"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "QueryHistoryToday", args: {"date":"04-21"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/175",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you tell me about the Morning Routine scene in my smart home syst…",
    requirement: "Can you tell me about the Morning Routine scene in my smart home system?",
    task: "User: Can you tell me about the Morning Routine scene in my smart home system?\nAI: Sure, let me check.",
    toolNames: ["QueryScene"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "QueryScene", args: {"name":"Morning Routine"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/176",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you search for the possible diseases and first-aid methods for sh…",
    requirement: "Can you search for the possible diseases and first-aid methods for shortness of breath?",
    task: "User: Can you search for the possible diseases and first-aid methods for shortness of breath?\nAI: Sure, I can help you with that. Please tell me the symptom you want to search for.\nUser: Shortness of breath.",
    toolNames: ["EmergencyKnowledge", "RecordHealthData", "ModifyRegistration"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "EmergencyKnowledge", args: {"symptom":"Shortness of breath"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/177",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you search for the possible diseases and first-aid methods for sh…",
    requirement: "Can you search for the possible diseases and first-aid methods for shortness of breath?",
    task: "User: Can you search for the possible diseases and first-aid methods for shortness of breath?\nAI: Sure, I can help you with that. Please tell me the symptom you want to search for.\nUser: Shortness of breath.\nAI: Here are the possible diseases and first-aid methods for shortness of breath: Asthma - A chronic respiratory condition characterized by inflammation and narrowing of the airways, leading to shortness of breath, wheezing, and coughing. Treatment may involve inhalers or nebulizers to open the airways, as well as medications to manage inflammation and prevent attacks. Pneumonia - An infection of the lungs that can cause fever, cough, shortness of breath, and other symptoms. Treatment may involve antibiotics, rest, and fluids to help the body fight the infection and recover.\nUser: Thanks. Can you help me modify the appointment of Olivia Davis with appointment ID 90123456 to October 15th with Dr. Brown?\nAI: Sure, I can do that.",
    toolNames: ["EmergencyKnowledge", "RecordHealthData", "ModifyRegistration"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "ModifyRegistration", args: {"appointment_id":"90123456","new_appointment_date":"2023-10-15","new_appointment_doctor":"Dr. Brown"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/178",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you search for the possible diseases and first-aid methods for sh…",
    requirement: "Can you search for the possible diseases and first-aid methods for shortness of breath?",
    task: "User: Can you search for the possible diseases and first-aid methods for shortness of breath?\nAI: Sure, I can help you with that. Please tell me the symptom you want to search for.\nUser: Shortness of breath.\nAI: Here are the possible diseases and first-aid methods for shortness of breath: Asthma - A chronic respiratory condition characterized by inflammation and narrowing of the airways, leading to shortness of breath, wheezing, and coughing. Treatment may involve inhalers or nebulizers to open the airways, as well as medications to manage inflammation and prevent attacks. Pneumonia - An infection of the lungs that can cause fever, cough, shortness of breath, and other symptoms. Treatment may involve antibiotics, rest, and fluids to help the body fight the infection and recover.\nUser: Thanks. Can you help me modify the appointment of Olivia Davis with appointment ID 90123456 to October 15th with Dr. Brown?\nAI: Sure, I can do that.\nAI: The modification of the appointment is successful.\nUser: Great. Can you help me record the blood pressure and heart rate history of user ID 12345 at 2023-10-19 10:30:00?\nAI: Sure, I can help with that. Please provide me with the health data such as blood pressure and heart rate.\nUser: The  blood pressure is 120/80, and the heart rate is 80.",
    toolNames: ["EmergencyKnowledge", "RecordHealthData", "ModifyRegistration"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "RecordHealthData", args: {"user_id":"12345","time":"2023-10-19 10:30:00","health_data":"[{"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/179",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you tell me today's date?",
    requirement: "Can you tell me today's date?",
    task: "User: Can you tell me today's date?\nAI: Sure, let me check.",
    toolNames: ["GetToday"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "GetToday", args: {} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/180",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me open a bank account?",
    requirement: "Can you help me open a bank account?",
    task: "User: Can you help me open a bank account?\nAI: Sure, I can help with that. What account identifier would you like to use?\nUser: My email address, john@example.com\nAI: And what password would you like to use for the account?\nUser: Let's use \"abc123\"\nAI: Finally, what is your full name?\nUser: John Smith\nAI: Great, I will open a new bank account with the identifier john@example.com, password \"abc123\", and account holder name John Smith.",
    toolNames: ["OpenBankAccount"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "OpenBankAccount", args: {"account":"john@example.com","password":"abc123","name":"John Smith"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/181",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you modify my appointment with doctor Smith on October 10th, 2023…",
    requirement: "Can you modify my appointment with doctor Smith on October 10th, 2023 to doctor Johnson on October 15th, 2023?",
    task: "User: Can you modify my appointment with doctor Smith on October 10th, 2023 to doctor Johnson on October 15th, 2023?\nAI: Sure, please provide me with your appointment ID and the new appointment date and doctor name.\nUser: My appointment ID is 90123456 and I would like to see Dr. Johnson on October 15th, 2023 instead.\nAI: Okay, I will modify your registration now.",
    toolNames: ["ModifyRegistration"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "ModifyRegistration", args: {"appointment_id":"90123456","new_appointment_date":"2023-10-15","new_appointment_doctor":"Dr. Johnson"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/182",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me check if I have a reminder to call my mom on March 16…",
    requirement: "Can you help me check if I have a reminder to call my mom on March 16th at 2:30pm?",
    task: "User: Can you help me check if I have a reminder to call my mom on March 16th at 2:30pm?\nAI: Sure, I can definitely help with that. Just to confirm, you want me to set a reminder for you to call your mom on March 16th at 2:30pm, correct?\nUser: Yes, that's correct.\nAI: Great. To check a reminder, I'll need your username and a valid token. Could you please provide me with your username and password?\nUser: My username is JohnDoe and my password is pass123.",
    toolNames: ["QueryReminder", "GetUserToken"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "GetUserToken", args: {"username":"JohnDoe","password":"pass123"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/183",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me check if I have a reminder to call my mom on March 16…",
    requirement: "Can you help me check if I have a reminder to call my mom on March 16th at 2:30pm?",
    task: "User: Can you help me check if I have a reminder to call my mom on March 16th at 2:30pm?\nAI: Sure, I can definitely help with that. Just to confirm, you want me to set a reminder for you to call your mom on March 16th at 2:30pm, correct?\nUser: Yes, that's correct.\nAI: Great. To check a reminder, I'll need your username and a valid token. Could you please provide me with your username and password?\nUser: My username is JohnDoe and my password is pass123.\nAI: Thank you. I was able to generate a token for you.",
    toolNames: ["QueryReminder", "GetUserToken"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "QueryReminder", args: {"token":"a9s8d7f6g5h4j3k2l1","content":"Call mom","time":"2023-03-16 14:30:00"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/184",
    level: 1,
    category: "Level 1 - single call",
    title: "Hi, can you help me add a new schedule for my meeting tomorrow at 2pm…",
    requirement: "Hi, can you help me add a new schedule for my meeting tomorrow at 2pm? Today is 2021-09-27",
    task: "User: Hi, can you help me add a new schedule for my meeting tomorrow at 2pm? Today is 2021-09-27\nAI: Sure, I can help you with that. What's the content of the agenda?\nUser: The meeting with the marketing team\nAI: Great, and where is the meeting located?\nUser: At the conference room\nAI: Okay, at what time is the meeting scheduled to start?\nUser: Tomorrow at 2pm\nAI: Got it, I need to authenticate with your account first. Can you please provide me with your username and password?\nUser: Sure, my username is foo and my password is bar",
    toolNames: ["GetUserToken", "AddAgenda"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "GetUserToken", args: {"username":"foo","password":"bar"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/185",
    level: 1,
    category: "Level 1 - single call",
    title: "Hi, can you help me add a new schedule for my meeting tomorrow at 2pm…",
    requirement: "Hi, can you help me add a new schedule for my meeting tomorrow at 2pm? Today is 2021-09-27",
    task: "User: Hi, can you help me add a new schedule for my meeting tomorrow at 2pm? Today is 2021-09-27\nAI: Sure, I can help you with that. What's the content of the agenda?\nUser: The meeting with the marketing team\nAI: Great, and where is the meeting located?\nUser: At the conference room\nAI: Okay, at what time is the meeting scheduled to start?\nUser: Tomorrow at 2pm\nAI: Got it, I need to authenticate with your account first. Can you please provide me with your username and password?\nUser: Sure, my username is foo and my password is bar\nAI: Thank you, I have retrieved your token. Now, let me add the agenda for you.",
    toolNames: ["GetUserToken", "AddAgenda"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "AddAgenda", args: {"token":"z9x8c7v6b5n4m3q2w1","content":"Meeting with the marketing team","time":"2021-09-28 14:00:00","location":"Conference room"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/186",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you tell me the stock price of SQ on March 14th, 2022?",
    requirement: "Can you tell me the stock price of SQ on March 14th, 2022?",
    task: "User: Can you tell me the stock price of SQ on March 14th, 2022?\nAI: Sure, to query the stock price of a given stock, I need the stock code and the date. The stock code for SQ is SQ and the date you're looking for is March 14th.",
    toolNames: ["QueryStock"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "QueryStock", args: {"stock_code":"SQ","date":"2022-03-14"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/187",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you add a reminder for me?",
    requirement: "Can you add a reminder for me?",
    task: "User: Can you add a reminder for me?\nAI: Sure, when would you like to be reminded and what would you like me to remind you of?\nUser: Can you remind me to call John at 3 pm tomorrow? Today is 2022-05-24\nAI: Got it. What's your username and password?\nUser: Username is user1 and password is user1pass.",
    toolNames: ["GetUserToken", "AddReminder"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "GetUserToken", args: {"username":"user1","password":"user1pass"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/188",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you add a reminder for me?",
    requirement: "Can you add a reminder for me?",
    task: "User: Can you add a reminder for me?\nAI: Sure, when would you like to be reminded and what would you like me to remind you of?\nUser: Can you remind me to call John at 3 pm tomorrow? Today is 2022-05-24\nAI: Got it. What's your username and password?\nUser: Username is user1 and password is user1pass.",
    toolNames: ["GetUserToken", "AddReminder"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "AddReminder", args: {"token":"n9m8k7j6h5g4f3d2s1a0","content":"Call John","time":"2022-05-25 15:00:00"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/189",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you add a reminder for me?",
    requirement: "Can you add a reminder for me?",
    task: "User: Can you add a reminder for me?\nAI: Sure, when would you like to be reminded and what would you like me to remind you of?\nUser: Can you remind me to call John at 3 pm tomorrow? Today is 2022-05-24\nAI: Got it. What's your username and password?\nUser: Username is user1 and password is user1pass.",
    toolNames: ["GetUserToken", "AddReminder"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "AddReminder", args: {"token":"n9m8k7j6h5g4f3d2s1a0","content":"Call John","time":"2022-05-25 15:00:00"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/190",
    level: 1,
    category: "Level 1 - single call",
    title: "Hi, I forgot my password. Can you help me reset it?",
    requirement: "Hi, I forgot my password. Can you help me reset it?",
    task: "User: Hi, I forgot my password. Can you help me reset it?\nAI: Of course! Do you remember your username and email address associated with the account?\nUser: Yes, my username is JohnDoe and my email is johndoe@example.com.\nAI: Great! To reset your password, I'll need to send you a verification code. Please confirm if you want me to proceed.\nUser: Yes, please go ahead.",
    toolNames: ["ForgotPassword"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "ForgotPassword", args: {"status":"Forgot Password","username":"JohnDoe","email":"johndoe@example.com"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/191",
    level: 1,
    category: "Level 1 - single call",
    title: "Hi, I forgot my password. Can you help me reset it?",
    requirement: "Hi, I forgot my password. Can you help me reset it?",
    task: "User: Hi, I forgot my password. Can you help me reset it?\nAI: Of course! Do you remember your username and email address associated with the account?\nUser: Yes, my username is JohnDoe and my email is johndoe@example.com.\nAI: Great! To reset your password, I'll need to send you a verification code. Please confirm if you want me to proceed.\nUser: Yes, please go ahead.\nAI: An email has been sent to you with a verification code. Please provide me the verification code to change your password.\nUser: I received the verification code. It's 970420.\nAI: Thanks! To set your new password, please provide me with a new one.\nUser: My new password is newpass123.",
    toolNames: ["ForgotPassword"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "ForgotPassword", args: {"status":"Verification Code","username":"JohnDoe","verification_code":"970420","new_password":"newpass123"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/192",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you tell me today's date?",
    requirement: "Can you tell me today's date?",
    task: "User: Can you tell me today's date?",
    toolNames: ["ModifyMeeting", "GetToday", "ModifyAlarm", "GetUserToken"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "GetToday", args: {} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/193",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you tell me today's date?",
    requirement: "Can you tell me today's date?",
    task: "User: Can you tell me today's date?\nAI: Sure! Today's date is 2023-03-31.\nUser: I want to modify a meeting reservation for April 1st. The topic is Team Building Activity, scheduled from 10am to 12pm at Recreation center. Attendees are Jackie Lee and Mike Chen. My username is JaneSmith.\nAI: Okay, I can modify the meeting reservation for you. Before I proceed, I need to authenticate you. Can you confirm your account details, such as email or password?\nUser: My password is password, email is janesmith@example.com.\nAI: Thank you for confirming.",
    toolNames: ["ModifyMeeting", "GetToday", "ModifyAlarm", "GetUserToken"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "GetUserToken", args: {"username":"JaneSmith","password":"password"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/194",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you tell me today's date?",
    requirement: "Can you tell me today's date?",
    task: "User: Can you tell me today's date?\nAI: Sure! Today's date is 2023-03-31.\nUser: I want to modify a meeting reservation for April 1st. The topic is Team Building Activity, scheduled from 10am to 12pm at Recreation center. Attendees are Jackie Lee and Mike Chen. My username is JaneSmith.\nAI: Okay, I can modify the meeting reservation for you. Before I proceed, I need to authenticate you. Can you confirm your account details, such as email or password?\nUser: My password is password, email is janesmith@example.com.\nAI: Thank you for confirming.\nAI: Now let me modify the meeting for you.",
    toolNames: ["ModifyMeeting", "GetToday", "ModifyAlarm", "GetUserToken"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "ModifyMeeting", args: {"token":"o8i7u6y5t4r3e2w1q0","meeting_topic":"Team Building Activity","start_time":"2023-04-01 10:00:00","end_time":"2023-04-01 12:00:00","location":"Recreation Center","attendees":"["} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/195",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you tell me today's date?",
    requirement: "Can you tell me today's date?",
    task: "User: Can you tell me today's date?\nAI: Sure! Today's date is 2023-03-31.\nUser: I want to modify a meeting reservation for April 1st. The topic is Team Building Activity, scheduled from 10am to 12pm at Recreation center. Attendees are Jackie Lee and Mike Chen. My username is JaneSmith.\nAI: Okay, I can modify the meeting reservation for you. Before I proceed, I need to authenticate you. Can you confirm your account details, such as email or password?\nUser: My password is password, email is janesmith@example.com.\nAI: Thank you for confirming.\nAI: Now let me modify the meeting for you.\nAI: The meeting reservation has been successfully modified.\nUser: Can you help me modify an alarm from March 20th 6:30am to 7:30am?\nAI: Sure, I can help you modify the alarm. Before that, I need to check if you are authenticated. Can you confirm your account details again?\nUser: My username is JaneSmith.\nAI: Alright, I'll need to get your token for authentication.",
    toolNames: ["ModifyMeeting", "GetToday", "ModifyAlarm", "GetUserToken"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "GetUserToken", args: {"username":"JaneSmith","password":"password"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/196",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you tell me today's date?",
    requirement: "Can you tell me today's date?",
    task: "User: Can you tell me today's date?\nAI: Sure! Today's date is 2023-03-31.\nUser: I want to modify a meeting reservation for April 1st. The topic is Team Building Activity, scheduled from 10am to 12pm at Recreation center. Attendees are Jackie Lee and Mike Chen. My username is JaneSmith.\nAI: Okay, I can modify the meeting reservation for you. Before I proceed, I need to authenticate you. Can you confirm your account details, such as email or password?\nUser: My password is password, email is janesmith@example.com.\nAI: Thank you for confirming.\nAI: Now let me modify the meeting for you.\nAI: The meeting reservation has been successfully modified.\nUser: Can you help me modify an alarm from March 20th 6:30am to 7:30am?\nAI: Sure, I can help you modify the alarm. Before that, I need to check if you are authenticated. Can you confirm your account details again?\nUser: My username is JaneSmith.\nAI: Alright, I'll need to get your token for authentication.\nAI: Okay. Now let me modify the alarm for you.",
    toolNames: ["ModifyMeeting", "GetToday", "ModifyAlarm", "GetUserToken"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "ModifyAlarm", args: {"token":"o8i7u6y5t4r3e2w1q0","from_time":"2023-03-20 06:30:00","to_time":"2023-03-20 07:30:00"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/197",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me change my password?",
    requirement: "Can you help me change my password?",
    task: "User: Can you help me change my password?\nAI: Sure, I can help you with that. I just need some information to authenticate your account. Can you please provide me with your email and current password?\nUser: My username is user1 and my current password is user1pass.\nAI: Thank you. Before we change your password, we need to generate a token to authenticate your account. Let me call the GetUserToken API.",
    toolNames: ["ModifyPassword", "GetUserToken"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "GetUserToken", args: {"username":"user1","password":"user1pass"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/198",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me change my password?",
    requirement: "Can you help me change my password?",
    task: "User: Can you help me change my password?\nAI: Sure, I can help you with that. I just need some information to authenticate your account. Can you please provide me with your email and current password?\nUser: My username is user1 and my current password is user1pass.\nAI: Thank you. Before we change your password, we need to generate a token to authenticate your account. Let me call the GetUserToken API.\nAI: Great, now we have the token we need. What would you like your new password to be?\nUser: My new password will be newpassword123.\nAI: Perfect, let's go ahead and call the ModifyPassword API to update your password.",
    toolNames: ["ModifyPassword", "GetUserToken"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "ModifyPassword", args: {"token":"n9m8k7j6h5g4f3d2s1a0","old_password":"user1pass","new_password":"newpassword123"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/199",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me change my appointment?",
    requirement: "Can you help me change my appointment?",
    task: "User: Can you help me change my appointment?\nAI: Sure, I can help with that. What's your appointment ID and the new date and doctor you want to reschedule it to?\nUser: My appointment ID is 90123456, and I want to change the date to October 15th and see Dr. Brown instead of Dr. Smith.\nAI: Okay, let me modify your registration with that information.",
    toolNames: ["ModifyRegistration"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "ModifyRegistration", args: {"appointment_id":"90123456","new_appointment_date":"2023-10-15","new_appointment_doctor":"Dr. Brown"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/200",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me record my health history?",
    requirement: "Can you help me record my health history?",
    task: "User: Can you help me record my health history?\nAI: Sure, I can help you with that. What is your user ID and health data you want to record?\nUser: My user ID is 12345 and I want to record my blood pressure and heart rate. The time is 2023-11-12 10:30:00.\nAI: Alright, let me make the API call to record your health data.",
    toolNames: ["AppointmentRegistration", "RecordHealthData", "QueryRegistration"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "RecordHealthData", args: {"user_id":"12345","time":"2023-11-12 10:30:00","health_data":"[{"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/201",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me record my health history?",
    requirement: "Can you help me record my health history?",
    task: "User: Can you help me record my health history?\nAI: Sure, I can help you with that. What is your user ID and health data you want to record?\nUser: My user ID is 12345 and I want to record my blood pressure and heart rate. The time is 2023-11-12 10:30:00.\nAI: Alright, let me make the API call to record your health data.\nAI: Your health data has been recorded successfully.\nUser: I need to register an appointment with Dr. Lee on 2023-11-15.\nAI: Sure thing. I can help you with that. What is your name and your doctor's name?=\nUser: My name is Mary and the doctor's name is Dr. Lee.\nAI: Alright, let me make the API call to register your appointment.",
    toolNames: ["AppointmentRegistration", "RecordHealthData", "QueryRegistration"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "AppointmentRegistration", args: {"patient_name":"Mary","date":"2023-11-15","doctor_name":"Dr. Lee"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/202",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me record my health history?",
    requirement: "Can you help me record my health history?",
    task: "User: Can you help me record my health history?\nAI: Sure, I can help you with that. What is your user ID and health data you want to record?\nUser: My user ID is 12345 and I want to record my blood pressure and heart rate. The time is 2023-11-12 10:30:00.\nAI: Alright, let me make the API call to record your health data.\nAI: Your health data has been recorded successfully.\nUser: I need to register an appointment with Dr. Lee on 2023-11-15.\nAI: Sure thing. I can help you with that. What is your name and your doctor's name?=\nUser: My name is Mary and the doctor's name is Dr. Lee.\nAI: Alright, let me make the API call to register your appointment.\nAI: Great news! Your appointment has been successfully registered with ID: 39167629.\nUser: Can you help me check my appointment on 2023-11-15?\nAI: Of course. What is your name and the appointment date you want to check?\nUser: My name is Mary and the appointment date is 2023-11-15.\nAI: Alright, let me make the API call to check your appointment.",
    toolNames: ["AppointmentRegistration", "RecordHealthData", "QueryRegistration"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "QueryRegistration", args: {"patient_name":"Mary","date":"2023-11-15"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/203",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me delete my account?",
    requirement: "Can you help me delete my account?",
    task: "User: Can you help me delete my account?\nAI: Sure, I need your authentication token to proceed. Can you please provide me with your account information?\nUser: My username is user1, email is user1@example.com, and password is user1pass.\nAI: Thank you.",
    toolNames: ["DeleteAccount", "GetUserToken"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "GetUserToken", args: {"username":"user1","password":"user1pass"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/204",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me delete my account?",
    requirement: "Can you help me delete my account?",
    task: "User: Can you help me delete my account?\nAI: Sure, I need your authentication token to proceed. Can you please provide me with your account information?\nUser: My username is user1, email is user1@example.com, and password is user1pass.\nAI: Thank you.\nAI: I have obtained your authentication token. Now I will call the DeleteAccount API to delete your account.",
    toolNames: ["DeleteAccount", "GetUserToken"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "DeleteAccount", args: {"token":"n9m8k7j6h5g4f3d2s1a0"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/205",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you modify my alarm from 2023-03-24 09:00:00 to 2023-03-24 10:30:…",
    requirement: "Can you modify my alarm from 2023-03-24 09:00:00 to 2023-03-24 10:30:00?",
    task: "User: Can you modify my alarm from 2023-03-24 09:00:00 to 2023-03-24 10:30:00?\nAI: Sure, let me modify the alarm for you. May I know your account information?\nUser: My username is user3.\nAI: Alright. Do you remember your password?\nUser: Yes, it's user3pass.\nAI: Thank you.",
    toolNames: ["ModifyAlarm", "GetUserToken"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "GetUserToken", args: {"username":"user3","password":"user3pass"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/206",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you modify my alarm from 2023-03-24 09:00:00 to 2023-03-24 10:30:…",
    requirement: "Can you modify my alarm from 2023-03-24 09:00:00 to 2023-03-24 10:30:00?",
    task: "User: Can you modify my alarm from 2023-03-24 09:00:00 to 2023-03-24 10:30:00?\nAI: Sure, let me modify the alarm for you. May I know your account information?\nUser: My username is user3.\nAI: Alright. Do you remember your password?\nUser: Yes, it's user3pass.\nAI: Thank you.\nAI: Alright, I have got your user token. Now, let me modify your alarm.",
    toolNames: ["ModifyAlarm", "GetUserToken"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "ModifyAlarm", args: {"from_time":"2023-03-24 09:00:00","to_time":"2023-03-24 10:30:00","token":"p9o8i7u6y5t4r3e2w1q"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/207",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me record my health data?",
    requirement: "Can you help me record my health data?",
    task: "User: Can you help me record my health data?\nAI: Sure, I can help with that. What is your user ID?\nUser: My user ID is 1234.\nAI: What is the time of your health data?\nUser: It's on April 3rd, 2023, at 10:00 AM.\nAI: What are the health data you want to record?\nUser: My blood pressure is 120/80, and my heart rate is 80.\nAI: Okay, I'll record your health data now.",
    toolNames: ["EmergencyKnowledge", "AppointmentRegistration", "RecordHealthData"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "RecordHealthData", args: {"user_id":"1234","time":"2023-04-03 10:00:00","health_data":"[{"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/208",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me record my health data?",
    requirement: "Can you help me record my health data?",
    task: "User: Can you help me record my health data?\nAI: Sure, I can help with that. What is your user ID?\nUser: My user ID is 1234.\nAI: What is the time of your health data?\nUser: It's on April 3rd, 2023, at 10:00 AM.\nAI: What are the health data you want to record?\nUser: My blood pressure is 120/80, and my heart rate is 80.\nAI: Okay, I'll record your health data now.\nAI: Your health data has been recorded successfully. Is there anything else I can help you with?\nUser: Yes. I need to register an appointment at the hospital.\nAI: Alright. What is your name?\nUser: My name is John.\nAI: Who is the doctor you would like to make an appointment with?\nUser: I'd like to make an appointment with Dr. Smith.\nAI: What is the date you would like to make an appointment for?\nUser: April 5th, 2023.\nAI: Okay. Let me register your appointment.",
    toolNames: ["EmergencyKnowledge", "AppointmentRegistration", "RecordHealthData"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "AppointmentRegistration", args: {"patient_name":"John","date":"2023-04-05","doctor_name":"Dr. Smith"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/209",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me record my health data?",
    requirement: "Can you help me record my health data?",
    task: "User: Can you help me record my health data?\nAI: Sure, I can help with that. What is your user ID?\nUser: My user ID is 1234.\nAI: What is the time of your health data?\nUser: It's on April 3rd, 2023, at 10:00 AM.\nAI: What are the health data you want to record?\nUser: My blood pressure is 120/80, and my heart rate is 80.\nAI: Okay, I'll record your health data now.\nAI: Your health data has been recorded successfully. Is there anything else I can help you with?\nUser: Yes. I need to register an appointment at the hospital.\nAI: Alright. What is your name?\nUser: My name is John.\nAI: Who is the doctor you would like to make an appointment with?\nUser: I'd like to make an appointment with Dr. Smith.\nAI: What is the date you would like to make an appointment for?\nUser: April 5th, 2023.\nAI: Okay. Let me register your appointment.\nAI: Your appointment has been registered, and your appointment ID is 79085333. Is there anything else I can help you with?\nUser: Yes. I have a fever, and I want to know what disease I might have.\nAI: I can help you with that. What is your symptom exactly?\nUser: I have a fever of over 100 degrees Fahrenheit.\nAI: Okay. Let me search for possible diseases.",
    toolNames: ["EmergencyKnowledge", "AppointmentRegistration", "RecordHealthData"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "EmergencyKnowledge", args: {"symptom":"fever"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/210",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me register on this site?",
    requirement: "Can you help me register on this site?",
    task: "User: Can you help me register on this site?\nAI: Sure, I can help you with that. What username would you like to use?\nUser: My username is john123\nAI: What password would you like to use?\nUser: My password is securepassword123\nAI: And what email will you be using?\nUser: My email is john123@email.com\nAI: Okay, I will now register you.",
    toolNames: ["RegisterUser"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "RegisterUser", args: {"username":"john123","password":"securepassword123","email":"john123@email.com"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/211",
    level: 1,
    category: "Level 1 - single call",
    title: "Hi, can you help me open a bank account?",
    requirement: "Hi, can you help me open a bank account?",
    task: "User: Hi, can you help me open a bank account?\nAI: Sure, I can definitely help you with that. To open a bank account, I need your account number, password, and name. Can you please provide me with that information?\nUser: Yes, my account number is 123456, my password is password123, and my name is John Smith.\nAI: Great. Let me open the account for you.",
    toolNames: ["OpenBankAccount", "QueryStock", "QueryBalance", "GetUserToken"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "OpenBankAccount", args: {"account":"123456","password":"password123","name":"John Smith"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/212",
    level: 1,
    category: "Level 1 - single call",
    title: "Hi, can you help me open a bank account?",
    requirement: "Hi, can you help me open a bank account?",
    task: "User: Hi, can you help me open a bank account?\nAI: Sure, I can definitely help you with that. To open a bank account, I need your account number, password, and name. Can you please provide me with that information?\nUser: Yes, my account number is 123456, my password is password123, and my name is John Smith.\nAI: Great. Let me open the account for you.\nAI: Your account has been successfully created.\nUser: Thank you. Can you please tell me my account balance?\nAI: Sure. In order to tell you your account balance, I need your authorization. Can you please provide me with your user token?\nUser: I don't have my user token. Can you please tell me how to get it?\nAI: Sure. To get your user token, I need your username and password. Can you please provide me with that information?\nUser: My username is user3 and my password is user3pass.\nAI: Great. Let me get your user token for you.",
    toolNames: ["OpenBankAccount", "QueryStock", "QueryBalance", "GetUserToken"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "GetUserToken", args: {"username":"user3","password":"user3pass"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/213",
    level: 1,
    category: "Level 1 - single call",
    title: "Hi, can you help me open a bank account?",
    requirement: "Hi, can you help me open a bank account?",
    task: "User: Hi, can you help me open a bank account?\nAI: Sure, I can definitely help you with that. To open a bank account, I need your account number, password, and name. Can you please provide me with that information?\nUser: Yes, my account number is 123456, my password is password123, and my name is John Smith.\nAI: Great. Let me open the account for you.\nAI: Your account has been successfully created.\nUser: Thank you. Can you please tell me my account balance?\nAI: Sure. In order to tell you your account balance, I need your authorization. Can you please provide me with your user token?\nUser: I don't have my user token. Can you please tell me how to get it?\nAI: Sure. To get your user token, I need your username and password. Can you please provide me with that information?\nUser: My username is user3 and my password is user3pass.\nAI: Great. Let me get your user token for you.\nAI: Now that I have your user token, let me check your account balance for you.",
    toolNames: ["OpenBankAccount", "QueryStock", "QueryBalance", "GetUserToken"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "QueryBalance", args: {"token":"p9o8i7u6y5t4r3e2w1q"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/214",
    level: 1,
    category: "Level 1 - single call",
    title: "Hi, can you help me open a bank account?",
    requirement: "Hi, can you help me open a bank account?",
    task: "User: Hi, can you help me open a bank account?\nAI: Sure, I can definitely help you with that. To open a bank account, I need your account number, password, and name. Can you please provide me with that information?\nUser: Yes, my account number is 123456, my password is password123, and my name is John Smith.\nAI: Great. Let me open the account for you.\nAI: Your account has been successfully created.\nUser: Thank you. Can you please tell me my account balance?\nAI: Sure. In order to tell you your account balance, I need your authorization. Can you please provide me with your user token?\nUser: I don't have my user token. Can you please tell me how to get it?\nAI: Sure. To get your user token, I need your username and password. Can you please provide me with that information?\nUser: My username is user3 and my password is user3pass.\nAI: Great. Let me get your user token for you.\nAI: Now that I have your user token, let me check your account balance for you.\nAI: Your account balance is $1683.29.\nUser: Thanks for helping me with that. Can you please tell me the stock price for Amazon on March 12, 2022?\nAI: Sure, let me check that for you.",
    toolNames: ["OpenBankAccount", "QueryStock", "QueryBalance", "GetUserToken"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "QueryStock", args: {"stock_code":"AMZN","date":"2022-03-12"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/215",
    level: 1,
    category: "Level 1 - single call",
    title: "Please cancel the timed switch of my device with ID 10000025 set for…",
    requirement: "Please cancel the timed switch of my device with ID 10000025 set for March 19th at 9:30 AM.",
    task: "User: Please cancel the timed switch of my device with ID 10000025 set for March 19th at 9:30 AM.\nAI: Alright, let me check and cancel the timed switch for that device.",
    toolNames: ["CancelTimedSwitch"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "CancelTimedSwitch", args: {"device_id":"10000025","time":"2023-03-19 09:30:00"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/216",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me open a bank account?",
    requirement: "Can you help me open a bank account?",
    task: "User: Can you help me open a bank account?\nAI: Sure, I can help with that. To open a bank account, I'll just need some information from you. What would you like to name the account?\nUser: Let's name it \"My New Account\".\nAI: Great, \"My New Account\". What password would you like to use for the account?\nUser: \"password123\".\nAI: And finally, what's your name?\nUser: My name is John.",
    toolNames: ["OpenBankAccount"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "OpenBankAccount", args: {"account":"My New Account","password":"password123","name":"John"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/217",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you tell me the definition of the word \"perplexed\"?",
    requirement: "Can you tell me the definition of the word \"perplexed\"?",
    task: "User: Can you tell me the definition of the word \"perplexed\"?\nAI: Sure, let me check for you.",
    toolNames: ["Dictionary"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "Dictionary", args: {"keyword":"perplexed"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/218",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me search artificial intelligence on wikipedia?",
    requirement: "Can you help me search artificial intelligence on wikipedia?",
    task: "User: Can you help me search artificial intelligence on wikipedia?\nAI: Sure.",
    toolNames: ["Wiki"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "Wiki", args: {"keyword":"artificial intelligence"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/219",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you tell me about my history for today, please?",
    requirement: "Can you tell me about my history for today, please?",
    task: "User: Can you tell me about my history for today, please?\nAI: Certainly. Just to confirm, you'd like to know about your activity history for today, correct?\nUser: Yes, that's correct.\nAI: Alright. I just need to know the date you're interested in  - could you please tell me what date you're asking about?\nUser: Today's date, 12-10, please.\nAI: Understood. To clarify, today's date is 12-10, is that right?\nUser: Yes, that's correct.",
    toolNames: ["QueryHistoryToday"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "QueryHistoryToday", args: {"date":"12-10"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/220",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me register as a user?",
    requirement: "Can you help me register as a user?",
    task: "User: Can you help me register as a user?\nAI: Sure, what's your desired username, password and email?\nUser: My username is johnsmith123, password is 1234password and email is johnsmith123@example.com.",
    toolNames: ["RegisterUser"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "RegisterUser", args: {"username":"johnsmith123","password":"1234password","email":"johnsmith123@example.com"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/221",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me reschedule my appointment with Dr. Smith?",
    requirement: "Can you help me reschedule my appointment with Dr. Smith?",
    task: "User: Can you help me reschedule my appointment with Dr. Smith?\nAI: Sure, please provide me your appointment ID, new appointment date and doctor's name.\nUser: My appointment ID is 12345678, I want to change it to May 13, 2023 and the new doctor would be Dr. Lee.\nAI: Alright, let me modify your appointment.",
    toolNames: ["EmergencyKnowledge", "ModifyRegistration"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "ModifyRegistration", args: {"appointment_id":"12345678","new_appointment_date":"2023-05-13","new_appointment_doctor":"Dr. Lee"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/222",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me reschedule my appointment with Dr. Smith?",
    requirement: "Can you help me reschedule my appointment with Dr. Smith?",
    task: "User: Can you help me reschedule my appointment with Dr. Smith?\nAI: Sure, please provide me your appointment ID, new appointment date and doctor's name.\nUser: My appointment ID is 12345678, I want to change it to May 13, 2023 and the new doctor would be Dr. Lee.\nAI: Alright, let me modify your appointment.\nAI: Your appointment has been successfully updated. Is there anything else I can help you with?\nUser: I'm feeling very tired lately. Can you suggest any possible diseases and first-aid?\nAI: Sorry to hear that. Can you tell me what symptoms you are experiencing?\nUser: I think it's fatigue.\nAI: Let me look up some possible diseases and first-aid for you.",
    toolNames: ["EmergencyKnowledge", "ModifyRegistration"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "EmergencyKnowledge", args: {"symptom":"fatigue"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/223",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you please query the Morning Routine scene for me?",
    requirement: "Can you please query the Morning Routine scene for me?",
    task: "User: Can you please query the Morning Routine scene for me?\nAI: Sure, let me check.",
    toolNames: ["QueryScene"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "QueryScene", args: {"name":"Morning Routine"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/224",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you delete my alarm at 7:00 a.m. on March 16th?",
    requirement: "Can you delete my alarm at 7:00 a.m. on March 16th?",
    task: "User: Can you delete my alarm at 7:00 a.m. on March 16th?\nAI: Sure, I can help you with that. What's your username and password?\nUser: My username is JohnDoe and my password is pass123.\nAI: Let me check your credentials.",
    toolNames: ["DeleteAlarm", "GetUserToken", "AddAgenda"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "GetUserToken", args: {"username":"JohnDoe","password":"pass123"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/225",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you delete my alarm at 7:00 a.m. on March 16th?",
    requirement: "Can you delete my alarm at 7:00 a.m. on March 16th?",
    task: "User: Can you delete my alarm at 7:00 a.m. on March 16th?\nAI: Sure, I can help you with that. What's your username and password?\nUser: My username is JohnDoe and my password is pass123.\nAI: Let me check your credentials.\nAI: I have received your token. What time is the alarm set for?\nUser: 7:00 a.m. on March 16th.\nAI: Okay.",
    toolNames: ["DeleteAlarm", "GetUserToken", "AddAgenda"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "DeleteAlarm", args: {"token":"a9s8d7f6g5h4j3k2l1","time":"2023-03-16 07:00:00"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/226",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you delete my alarm at 7:00 a.m. on March 16th?",
    requirement: "Can you delete my alarm at 7:00 a.m. on March 16th?",
    task: "User: Can you delete my alarm at 7:00 a.m. on March 16th?\nAI: Sure, I can help you with that. What's your username and password?\nUser: My username is JohnDoe and my password is pass123.\nAI: Let me check your credentials.\nAI: I have received your token. What time is the alarm set for?\nUser: 7:00 a.m. on March 16th.\nAI: Okay.\nAI: Your alarm is now deleted. Is there anything else I can help you with?\nUser: Yes, can you add an agenda item for me?\nAI: Of course. What's the content of the agenda?\nUser: I need to attend a meeting.\nAI: Where is the meeting located?\nUser: It's at the office downtown.\nAI: When is the meeting?\nUser: It's at 2:00 p.m. on March 18th.\nAI: Great, I'm ready to add your agenda item.",
    toolNames: ["DeleteAlarm", "GetUserToken", "AddAgenda"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "AddAgenda", args: {"token":"a9s8d7f6g5h4j3k2l1","time":"2023-03-18 14:00:00","content":"Attend meeting","location":"Office downtown"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/227",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you tell me the stock price for NFLX on February 23, 2022?",
    requirement: "Can you tell me the stock price for NFLX on February 23, 2022?",
    task: "User: Can you tell me the stock price for NFLX on February 23, 2022?\nAI: Sure, I can help you with that.",
    toolNames: ["OpenBankAccount", "QueryStock", "QueryBalance", "GetUserToken"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "QueryStock", args: {"stock_code":"NFLX","date":"2022-02-23"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/228",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you tell me the stock price for NFLX on February 23, 2022?",
    requirement: "Can you tell me the stock price for NFLX on February 23, 2022?",
    task: "User: Can you tell me the stock price for NFLX on February 23, 2022?\nAI: Sure, I can help you with that.\nAI: The stock price of NFLX on February 23, 2022 was 614.2.\nUser: Can you check my account balance?\nAI: Yes, I can. I need your token for that.\nUser: My username is user3 and password is user3pass.",
    toolNames: ["OpenBankAccount", "QueryStock", "QueryBalance", "GetUserToken"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "GetUserToken", args: {"username":"user3","password":"user3pass"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/229",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you tell me the stock price for NFLX on February 23, 2022?",
    requirement: "Can you tell me the stock price for NFLX on February 23, 2022?",
    task: "User: Can you tell me the stock price for NFLX on February 23, 2022?\nAI: Sure, I can help you with that.\nAI: The stock price of NFLX on February 23, 2022 was 614.2.\nUser: Can you check my account balance?\nAI: Yes, I can. I need your token for that.\nUser: My username is user3 and password is user3pass.\nAI: Now, I can check your account balance.",
    toolNames: ["OpenBankAccount", "QueryStock", "QueryBalance", "GetUserToken"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "QueryBalance", args: {"token":"p9o8i7u6y5t4r3e2w1q"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/230",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you tell me the stock price for NFLX on February 23, 2022?",
    requirement: "Can you tell me the stock price for NFLX on February 23, 2022?",
    task: "User: Can you tell me the stock price for NFLX on February 23, 2022?\nAI: Sure, I can help you with that.\nAI: The stock price of NFLX on February 23, 2022 was 614.2.\nUser: Can you check my account balance?\nAI: Yes, I can. I need your token for that.\nUser: My username is user3 and password is user3pass.\nAI: Now, I can check your account balance.\nAI: Your account balance is 1683.29.\nUser: I want to open a new bank account with account: 123456, password: secret123, and name: John Doe.\nAI: Okay, I can help you with that.",
    toolNames: ["OpenBankAccount", "QueryStock", "QueryBalance", "GetUserToken"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "OpenBankAccount", args: {"account":"123456","password":"secret123","name":"John Doe"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/231",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me to register an account?",
    requirement: "Can you help me to register an account?",
    task: "User: Can you help me to register an account?\nAI: Sure, what username, password and email do you want to use?\nUser: My username is 'user123', password is 'pass123', and email is 'user123@example.com'\nAI: Alright, I will register the account for you. Please wait a moment.",
    toolNames: ["RegisterUser"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "RegisterUser", args: {"username":"user123","password":"pass123","email":"user123@example.com"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/232",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you show me my history for today?",
    requirement: "Can you show me my history for today?",
    task: "User: Can you show me my history for today?\nAI: Sure, I can do that. Please provide me the date you want to check in the format of mm-dd.\nUser: 12-10",
    toolNames: ["QueryHistoryToday"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "QueryHistoryToday", args: {"date":"12-10"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/233",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you give me my health data for the last week?",
    requirement: "Can you give me my health data for the last week?",
    task: "User: Can you give me my health data for the last week?\nAI: Sure, I can help you with that. Can you please provide your user id?\nUser: A12345\nAI: Great. And what is the start time of the time span you're interested in? Please provide the time in the format: %Y-%m-%d %H:%M:%S\nUser: 2023-03-08 00:00:00\nAI: And what is the end time of the time span you're interested in? Please provide the time in the format: %Y-%m-%d %H:%M:%S\nUser: 2023-03-15 23:59:59",
    toolNames: ["QueryHealthData"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "QueryHealthData", args: {"user_id":"A12345","start_time":"2023-03-08 00:00:00","end_time":"2023-03-15 23:59:59"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/234",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you tell me the historical events that happened on April 21st?",
    requirement: "Can you tell me the historical events that happened on April 21st?",
    task: "User: Can you tell me the historical events that happened on April 21st?\nAI: Sure, I can query the history for you.",
    toolNames: ["QueryHistoryToday", "Calculator"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "QueryHistoryToday", args: {"date":"04-21"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/235",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you tell me the historical events that happened on April 21st?",
    requirement: "Can you tell me the historical events that happened on April 21st?",
    task: "User: Can you tell me the historical events that happened on April 21st?\nAI: Sure, I can query the history for you.\nAI: Here are some historical events that happened on April 21st in history. [04-21, [{\"Title\": \"First Game of the New York Yankees\", \"Date\": \"1903-04-21\", \"Description\": \"The New York Yankees (then known as the New York Highlanders) played their first game in franchise history, losing to the Washington Senators by a score of 3-1 at Hilltop Park in New York City.\"}, {\"Title\": \"The Death of Rome's Founder, Romulus\", \"Date\": \"717-04-21\", \"Description\": \"According to legend, Romulus, the founder and first king of Rome, was carried off to heaven by a whirlwind on this day.\"}, {\"Title\": \"The Birth of Queen Elizabeth II\", \"Date\": \"1926-04-21\", \"Description\": \"Queen Elizabeth II, the current queen of the United Kingdom, was born on this day in London.\"}, {\"Title\": \"The Birth of Anthony Quinn\", \"Date\": \"1915-04-21\", \"Description\": \"Actor Anthony Quinn, known for his roles in films like Lawrence of Arabia and Zorba the Greek, was born on this day in Chihuahua, Mexico.\"}, {\"Title\": \"The Death of Henry VIII\", \"Date\": \"1547-04-21\", \"Description\": \"King Henry VIII of England, best known for his many marriages and his role in the English Reformation, died on this day at the age of 55.\"}]]\nUser: Can you do some calculations for me?\nAI: Sure thing. What calculation do you need me to do?\nUser: (23+7)*3-42/6",
    toolNames: ["QueryHistoryToday", "Calculator"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "Calculator", args: {"formula":"(23+7)*3-42/6"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/236",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me delete my account?",
    requirement: "Can you help me delete my account?",
    task: "User: Can you help me delete my account?\nAI: Sure, I can help with that. Can you provide your username and password?\nUser: My username is \"foo\", password is \"bar\".\nAI: Alright, let me check if the token you provided is valid.",
    toolNames: ["DeleteAccount", "GetUserToken"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "GetUserToken", args: {"username":"foo","password":"bar"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/237",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me delete my account?",
    requirement: "Can you help me delete my account?",
    task: "User: Can you help me delete my account?\nAI: Sure, I can help with that. Can you provide your username and password?\nUser: My username is \"foo\", password is \"bar\".\nAI: Alright, let me check if the token you provided is valid.\nAI: Your account token is valid.",
    toolNames: ["DeleteAccount", "GetUserToken"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "DeleteAccount", args: {"token":"z9x8c7v6b5n4m3q2w1"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/238",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you add a meeting reservation for me on November 12th, 2023 at 3…",
    requirement: "Can you add a meeting reservation for me on November 12th, 2023 at 3 PM? The meeting topic is about the new project launch, held in the conference room with John and Jane attending.",
    task: "User: Can you add a meeting reservation for me on November 12th, 2023 at 3 PM? The meeting topic is about the new project launch, held in the conference room with John and Jane attending.\nAI: Sure, to clarify, you want a meeting reservation for November 12th, 2023 at 3 PM with the topic of new project launch, held in the conference room and John and Jane attending. Is that correct?\nUser: Yes, that's correct.",
    toolNames: ["GetUserToken", "AddMeeting"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "GetUserToken", args: {"username":"JohnDoe","password":"pass123"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/239",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you add a meeting reservation for me on November 12th, 2023 at 3…",
    requirement: "Can you add a meeting reservation for me on November 12th, 2023 at 3 PM? The meeting topic is about the new project launch, held in the conference room with John and Jane attending.",
    task: "User: Can you add a meeting reservation for me on November 12th, 2023 at 3 PM? The meeting topic is about the new project launch, held in the conference room with John and Jane attending.\nAI: Sure, to clarify, you want a meeting reservation for November 12th, 2023 at 3 PM with the topic of new project launch, held in the conference room and John and Jane attending. Is that correct?\nUser: Yes, that's correct.",
    toolNames: ["GetUserToken", "AddMeeting"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "AddMeeting", args: {"token":"a9s8d7f6g5h4j3k2l1","meeting_topic":"new project launch","start_time":"2023-11-12 15:00:00","end_time":"2023-11-12 16:00:00","location":"conference room","attendees":"["} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/240",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you add a meeting reservation for me on November 12th, 2023 at 3…",
    requirement: "Can you add a meeting reservation for me on November 12th, 2023 at 3 PM? The meeting topic is about the new project launch, held in the conference room with John and Jane attending.",
    task: "User: Can you add a meeting reservation for me on November 12th, 2023 at 3 PM? The meeting topic is about the new project launch, held in the conference room with John and Jane attending.\nAI: Sure, to clarify, you want a meeting reservation for November 12th, 2023 at 3 PM with the topic of new project launch, held in the conference room and John and Jane attending. Is that correct?\nUser: Yes, that's correct.",
    toolNames: ["GetUserToken", "AddMeeting"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "AddMeeting", args: {"token":"a9s8d7f6g5h4j3k2l1","meeting_topic":"new project launch","start_time":"2023-11-12 15:00:00","end_time":"2023-11-12 16:00:00","location":"conference room","attendees":"["} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/241",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you please check my account balance?",
    requirement: "Can you please check my account balance?",
    task: "User: Can you please check my account balance?\nAI: Sure, I can help with that. To access your account balance, I need your token. Do you have it?\nUser: No, I don't. How can I get it?\nAI: I can help you get your token. Can you give me your username, password, and email address?\nUser: My username is user2, password is user2pass, and email is user2@example.com.\nAI: Alright. Let me get your token first.",
    toolNames: ["OpenBankAccount", "QueryStock", "QueryBalance", "GetUserToken"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "GetUserToken", args: {"username":"user2","password":"user2pass"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/242",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you please check my account balance?",
    requirement: "Can you please check my account balance?",
    task: "User: Can you please check my account balance?\nAI: Sure, I can help with that. To access your account balance, I need your token. Do you have it?\nUser: No, I don't. How can I get it?\nAI: I can help you get your token. Can you give me your username, password, and email address?\nUser: My username is user2, password is user2pass, and email is user2@example.com.\nAI: Alright. Let me get your token first.\nAI: I have successfully retrieved your token. May I now use it to access your account balance?\nUser: Yes, please.",
    toolNames: ["OpenBankAccount", "QueryStock", "QueryBalance", "GetUserToken"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "QueryBalance", args: {"token":"o9i8u7y6t5r4e3w2q1"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/243",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you please check my account balance?",
    requirement: "Can you please check my account balance?",
    task: "User: Can you please check my account balance?\nAI: Sure, I can help with that. To access your account balance, I need your token. Do you have it?\nUser: No, I don't. How can I get it?\nAI: I can help you get your token. Can you give me your username, password, and email address?\nUser: My username is user2, password is user2pass, and email is user2@example.com.\nAI: Alright. Let me get your token first.\nAI: I have successfully retrieved your token. May I now use it to access your account balance?\nUser: Yes, please.\nAI: Your account balance is $215.66.\nUser: Thank you. Can you also check the stock price of Tesla on March 1st, 2022?\nAI: Of course. What was the stock code?\nUser: TSLA.\nAI: Okay. Let me check.",
    toolNames: ["OpenBankAccount", "QueryStock", "QueryBalance", "GetUserToken"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "QueryStock", args: {"stock_code":"TSLA","date":"2022-03-01"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/244",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you please check my account balance?",
    requirement: "Can you please check my account balance?",
    task: "User: Can you please check my account balance?\nAI: Sure, I can help with that. To access your account balance, I need your token. Do you have it?\nUser: No, I don't. How can I get it?\nAI: I can help you get your token. Can you give me your username, password, and email address?\nUser: My username is user2, password is user2pass, and email is user2@example.com.\nAI: Alright. Let me get your token first.\nAI: I have successfully retrieved your token. May I now use it to access your account balance?\nUser: Yes, please.\nAI: Your account balance is $215.66.\nUser: Thank you. Can you also check the stock price of Tesla on March 1st, 2022?\nAI: Of course. What was the stock code?\nUser: TSLA.\nAI: Okay. Let me check.\nAI: The stock price of TSLA on March 1st, 2022 was $984.2.\nUser: Great. Can you help me open a bank account?\nAI: Sure. I can help you with that. What account identifier, password, and account holder name would you like to use?\nUser: Account identifier is user2, password is user2password, and account holder name is John Smith.",
    toolNames: ["OpenBankAccount", "QueryStock", "QueryBalance", "GetUserToken"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "OpenBankAccount", args: {"account":"user2","password":"user2password","name":"John Smith"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/245",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you tell me the stock price of SQ on March 14, 2022?",
    requirement: "Can you tell me the stock price of SQ on March 14, 2022?",
    task: "User: Can you tell me the stock price of SQ on March 14, 2022?\nAI: Sure, let me check that for you.",
    toolNames: ["QueryStock"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "QueryStock", args: {"stock_code":"SQ","date":"2022-03-14"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/246",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me check if I have a reminder for attending a meeting on…",
    requirement: "Can you help me check if I have a reminder for attending a meeting on March 18th at 10:30 am?",
    task: "User: Can you help me check if I have a reminder for attending a meeting on March 18th at 10:30 am?\nAI: Sure. Do you have the reminder content?\nUser: Yes, the content is \"Attend meeting\".\nAI: OK. I need to check your token to access the reminder. Can you please provide your username and password?\nUser: My username is \"newuser\" and my password is \"newpass\".",
    toolNames: ["QueryReminder", "GetUserToken"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "GetUserToken", args: {"username":"newuser","password":"newpass"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/247",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me check if I have a reminder for attending a meeting on…",
    requirement: "Can you help me check if I have a reminder for attending a meeting on March 18th at 10:30 am?",
    task: "User: Can you help me check if I have a reminder for attending a meeting on March 18th at 10:30 am?\nAI: Sure. Do you have the reminder content?\nUser: Yes, the content is \"Attend meeting\".\nAI: OK. I need to check your token to access the reminder. Can you please provide your username and password?\nUser: My username is \"newuser\" and my password is \"newpass\".\nAI: Thanks! Now, can you please give me a moment to check the reminder?",
    toolNames: ["QueryReminder", "GetUserToken"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "QueryReminder", args: {"token":"l9k8j7h6g5f4d3s2a1","content":"Attend meeting","time":"2023-03-18 10:30:00"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/248",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me register as a new user?",
    requirement: "Can you help me register as a new user?",
    task: "User: Can you help me register as a new user?\nAI: Sure! What would you like your username to be?\nUser: My username is JohnSmith123\nAI: What password would you like to use?\nUser: My password is qwerty1234\nAI: And finally, what is your email address?\nUser: My email is johnsmith123@gmail.com",
    toolNames: ["RegisterUser"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "RegisterUser", args: {"username":"JohnSmith123","password":"qwerty1234","email":"johnsmith123@gmail.com"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/249",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me change my password?",
    requirement: "Can you help me change my password?",
    task: "User: Can you help me change my password?\nAI: Sure, I can definitely help with that. Before we begin, please provide me with your username and old password.\nUser: My username is user2 and my old password is user2pass.\nAI: Thanks, I also need to authenticate your account by getting a token. One moment please.",
    toolNames: ["ModifyPassword", "GetUserToken"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "GetUserToken", args: {"username":"user2","password":"user2pass"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/250",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me change my password?",
    requirement: "Can you help me change my password?",
    task: "User: Can you help me change my password?\nAI: Sure, I can definitely help with that. Before we begin, please provide me with your username and old password.\nUser: My username is user2 and my old password is user2pass.\nAI: Thanks, I also need to authenticate your account by getting a token. One moment please.\nAI: Okay, I have successfully obtained the token. Now, what would you like your new password to be?\nUser: My new password is qwerty123.\nAI: Great, I will now change your password.",
    toolNames: ["ModifyPassword", "GetUserToken"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "ModifyPassword", args: {"token":"o9i8u7y6t5r4e3w2q1","old_password":"user2pass","new_password":"qwerty123"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/251",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me open a bank account?",
    requirement: "Can you help me open a bank account?",
    task: "User: Can you help me open a bank account?\nAI: Sure. To open a bank account, I'll need your account number, password, and name.\nUser: My account number is 12345, my password is secret123, and my name is John Smith.\nAI: Alright. Let me create your bank account.",
    toolNames: ["OpenBankAccount", "QueryStock"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "OpenBankAccount", args: {"account":"12345","password":"secret123","name":"John Smith"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/252",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me open a bank account?",
    requirement: "Can you help me open a bank account?",
    task: "User: Can you help me open a bank account?\nAI: Sure. To open a bank account, I'll need your account number, password, and name.\nUser: My account number is 12345, my password is secret123, and my name is John Smith.\nAI: Alright. Let me create your bank account.\nAI: Your account was successfully created.\nUser: Thanks. Can you tell me the stock price for Amazon on March 10, 2022?\nAI: Sure. Let me check.",
    toolNames: ["OpenBankAccount", "QueryStock"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "QueryStock", args: {"stock_code":"AMZN","date":"2022-03-10"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/253",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you translate \"hello\" to French?",
    requirement: "Can you translate \"hello\" to French?",
    task: "User: Can you translate \"hello\" to French?\nAI: Sure, I can help with that.",
    toolNames: ["Translate"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "Translate", args: {"src":"hello","tgt_lang":"fr"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/254",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you search for news articles about sustainable development goals?",
    requirement: "Can you search for news articles about sustainable development goals?",
    task: "User: Can you search for news articles about sustainable development goals?\nAI: Sure, what specific keyword are you looking for?\nUser: the sustainable development?\nAI: OK.",
    toolNames: ["SearchEngine"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "SearchEngine", args: {"keyword":"the sustainable development"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/255",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you cancel my appointment on April 10th with Dr. Davis under the…",
    requirement: "Can you cancel my appointment on April 10th with Dr. Davis under the name David Brown? The appointment ID is 56789012.",
    task: "User: Can you cancel my appointment on April 10th with Dr. Davis under the name David Brown? The appointment ID is 56789012.\nAI: Sure, let me check...",
    toolNames: ["RecordHealthData", "CancelRegistration"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "CancelRegistration", args: {"appointment_id":"56789012"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/256",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you cancel my appointment on April 10th with Dr. Davis under the…",
    requirement: "Can you cancel my appointment on April 10th with Dr. Davis under the name David Brown? The appointment ID is 56789012.",
    task: "User: Can you cancel my appointment on April 10th with Dr. Davis under the name David Brown? The appointment ID is 56789012.\nAI: Sure, let me check...\nAI: Your appointment on April 10th with Dr. Davis under the name David Brown has been successfully cancelled. Is there anything else I can assist you with?\nUser: Yes, I need to record my health data.\nAI: Alright, please provide your user ID, time and health data.\nUser: My user ID is 123456, the time is 2023-04-12 10:30:00, and the health data is [{'name': 'blood_pressure', 'value': '130/90'}, {'name': 'heart_rate', 'value': '75'}].\nAI: Alright, I have recorded your health data.",
    toolNames: ["RecordHealthData", "CancelRegistration"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "RecordHealthData", args: {"user_id":"123456","time":"2023-04-12 10:30:00","health_data":"[{"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/257",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you play the song \"Shape of You\" for me?",
    requirement: "Can you play the song \"Shape of You\" for me?",
    task: "User: Can you play the song \"Shape of You\" for me?\nAI: Sure, playing \"Shape of You\" for you now.",
    toolNames: ["PlayMusic"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "PlayMusic", args: {"music_name":"Shape of You"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/258",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me book a hotel room for 2 adults and 1 child from Septe…",
    requirement: "Can you help me book a hotel room for 2 adults and 1 child from September 1st to September 5th?",
    task: "User: Can you help me book a hotel room for 2 adults and 1 child from September 1st to September 5th?\nAI: Sure, I can help with that. What is the name of the hotel you wish to book?\nUser: Sheraton Hotel\nAI: Great, when do you want to check in and check out?\nUser: September 1st for check in and September 5th for check out\nAI: And how many rooms do you need?\nUser: Just one, thanks.\nAI: Alright.",
    toolNames: ["BookHotel"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "BookHotel", args: {"hotel_name":"Sheraton Hotel","check_in_time":"2023-09-01","check_out_time":"2023-09-05","room_count":"1","adult_count":"2","child_count":"1"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/259",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me set an alarm for 8:30 AM on March 25th, 2023?",
    requirement: "Can you help me set an alarm for 8:30 AM on March 25th, 2023?",
    task: "User: Can you help me set an alarm for 8:30 AM on March 25th, 2023?\nAI: Sure, I can do that. May I know your token for authorization?\nUser: I don't have a token.\nAI: No worries, I can get that for you. May I know your login information, please?\nUser: My username is \"admin\" and the password is \"adminpass\".",
    toolNames: ["AddAlarm", "GetUserToken"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "GetUserToken", args: {"username":"admin","password":"adminpass"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/260",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me set an alarm for 8:30 AM on March 25th, 2023?",
    requirement: "Can you help me set an alarm for 8:30 AM on March 25th, 2023?",
    task: "User: Can you help me set an alarm for 8:30 AM on March 25th, 2023?\nAI: Sure, I can do that. May I know your token for authorization?\nUser: I don't have a token.\nAI: No worries, I can get that for you. May I know your login information, please?\nUser: My username is \"admin\" and the password is \"adminpass\".\nAI: Thanks. I have obtained your token. What's the time you want me to set the alarm for?\nUser: Please set the alarm for 8:30 AM on March 25th, 2023.",
    toolNames: ["AddAlarm", "GetUserToken"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "AddAlarm", args: {"token":"m9n8b7v6c5x4z3a2s1","time":"2023-03-25 08:30:00"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/261",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you switch off my smart bulb at 10 pm tonight? Today is 2022-03-0…",
    requirement: "Can you switch off my smart bulb at 10 pm tonight? Today is 2022-03-01.",
    task: "User: Can you switch off my smart bulb at 10 pm tonight? Today is 2022-03-01.\nAI: Sure, I can do that for you. What's the device ID of your smart bulb?\nUser: It's 123456.\nAI: Got it. And what time do you want me to switch it off?\nUser: 10 pm tonight.\nAI: Understood. Switching off your smart bulb at 10 pm tonight. Please wait a moment.",
    toolNames: ["TimedSwitch"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "TimedSwitch", args: {"device_id":"123456","time":"2022-03-01 22:00:00","on":"False"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/262",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you check the registration of patient with ID 34567890 on March 2…",
    requirement: "Can you check the registration of patient with ID 34567890 on March 25, 2023 and tell me about his appointments?",
    task: "User: Can you check the registration of patient with ID 34567890 on March 25, 2023 and tell me about his appointments?\nAI: What's your name?\nUser: Robert Lee\nAI: Sure, let me check.",
    toolNames: ["EmergencyKnowledge", "QueryRegistration"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "QueryRegistration", args: {"patient_name":"Robert Lee","date":"2023-03-25"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/263",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you check the registration of patient with ID 34567890 on March 2…",
    requirement: "Can you check the registration of patient with ID 34567890 on March 25, 2023 and tell me about his appointments?",
    task: "User: Can you check the registration of patient with ID 34567890 on March 25, 2023 and tell me about his appointments?\nAI: What's your name?\nUser: Robert Lee\nAI: Sure, let me check. \nAI: According to the registration, Robert Lee has one appointment on March 25, 2023 with Dr. Kim.\nUser: Thank you. Can you also search for possible diseases related to shortness of breath and their first-aid methods?\nAI: Of course, please tell me the symptom for which you want to search.\nUser: Shortness of breath.",
    toolNames: ["EmergencyKnowledge", "QueryRegistration"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "EmergencyKnowledge", args: {"symptom":"shortness of breath"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/264",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you delete my alarm for March 20th at 6:30am?",
    requirement: "Can you delete my alarm for March 20th at 6:30am?",
    task: "User: Can you delete my alarm for March 20th at 6:30am?\nAI: Sure, let me check. I will need your user token for authentication. Can you please provide your username and password?\nUser: My username is JaneSmith and my password is password.\nAI: Thank you.",
    toolNames: ["DeleteAlarm", "GetUserToken"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "GetUserToken", args: {"username":"JaneSmith","password":"password"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/265",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you delete my alarm for March 20th at 6:30am?",
    requirement: "Can you delete my alarm for March 20th at 6:30am?",
    task: "User: Can you delete my alarm for March 20th at 6:30am?\nAI: Sure, let me check. I will need your user token for authentication. Can you please provide your username and password?\nUser: My username is JaneSmith and my password is password.\nAI: Thank you.\nAI: I have received your token. Now, please confirm the time for the alarm you want me to delete.\nUser: The time is March 20th at 6:30am.\nAI: Thank you.",
    toolNames: ["DeleteAlarm", "GetUserToken"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "DeleteAlarm", args: {"token":"o8i7u6y5t4r3e2w1q0","time":"2023-03-20 06:30:00"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/266",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me modify a meeting reservation?",
    requirement: "Can you help me modify a meeting reservation?",
    task: "User: Can you help me modify a meeting reservation?\nAI: Sure, I can help you with that. What changes do you want to make to your reservation?\nUser: I need to change the start time, location, and attendee list.\nAI: Alright, I can assist you with that. Before we proceed, could you please provide me your user credentials?\nUser: Sure, my username is newuser, and my password is newpass.\nAI: Thank you.",
    toolNames: ["ModifyMeeting", "GetUserToken"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "GetUserToken", args: {"username":"newuser","password":"newpass"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/267",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me modify a meeting reservation?",
    requirement: "Can you help me modify a meeting reservation?",
    task: "User: Can you help me modify a meeting reservation?\nAI: Sure, I can help you with that. What changes do you want to make to your reservation?\nUser: I need to change the start time, location, and attendee list.\nAI: Alright, I can assist you with that. Before we proceed, could you please provide me your user credentials?\nUser: Sure, my username is newuser, and my password is newpass.\nAI: Thank you.\nAI: Ok, we have received your token. Now please tell me what you want to change.\nUser: I want to change the meeting topic to New Employee Orientation, start time to 2023-03-27 09:00:00, end time to 2023-03-27 11:00:00, location to Training Room, and attendees to David Wang, Amy Chen, and Erica Liu.\nAI: Ok.",
    toolNames: ["ModifyMeeting", "GetUserToken"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "ModifyMeeting", args: {"token":"l9k8j7h6g5f4d3s2a1","meeting_topic":"New Employee Orientation","start_time":"2023-03-27 09:00:00","end_time":"2023-03-27 11:00:00","location":"Training Room","attendees":"["} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/268",
    level: 1,
    category: "Level 1 - single call",
    title: "Hi, can you help me modify my schedule for next week?",
    requirement: "Hi, can you help me modify my schedule for next week?",
    task: "User: Hi, can you help me modify my schedule for next week?\nAI: Sure, what do you want to modify?\nUser: I need to change the time and location for \"Pick up dry cleaning\" task.\nAI: Okay, let me check. Can you please provide me your username and password?\nUser: Yes, my username is \"newuser\" and my password is \"newpass\".",
    toolNames: ["ModifyAgenda", "GetUserToken"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "GetUserToken", args: {"username":"newuser","password":"newpass"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/269",
    level: 1,
    category: "Level 1 - single call",
    title: "Hi, can you help me modify my schedule for next week?",
    requirement: "Hi, can you help me modify my schedule for next week?",
    task: "User: Hi, can you help me modify my schedule for next week?\nAI: Sure, what do you want to modify?\nUser: I need to change the time and location for \"Pick up dry cleaning\" task.\nAI: Okay, let me check. Can you please provide me your username and password?\nUser: Yes, my username is \"newuser\" and my password is \"newpass\".\nAI: Thank you. Now, please provide me the new time and location for the task.\nUser: The new time is \"2023-03-22 14:00:00\" and the new location is \"Laundry\".",
    toolNames: ["ModifyAgenda", "GetUserToken"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "ModifyAgenda", args: {"token":"l9k8j7h6g5f4d3s2a1","content":"Pick up dry cleaning","time":"2023-03-22 14:00:00","location":"Laundry"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/270",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you turn on my living room light at 7 pm tonight? Today is 2021-0…",
    requirement: "Can you turn on my living room light at 7 pm tonight? Today is 2021-08-05.",
    task: "User: Can you turn on my living room light at 7 pm tonight? Today is 2021-08-05.\nAI: Sure, I can help you with that. What is the ID of your living room light?\nUser: The ID is 12345.\nAI: Got it. And at what time do you want me to turn it on?\nUser: 7 pm.\nAI: Okay. Is that AM or PM?\nUser: PM.\nAI: Great. Lastly, do you want me to turn it on or off at that time?\nUser: I want you to turn it on.\nAI: Understood. I will turn on your living room light at 7 pm tonight.",
    toolNames: ["TimedSwitch"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "TimedSwitch", args: {"device_id":"12345","time":"2021-08-05 19:00:00","on":"True"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/271",
    level: 1,
    category: "Level 1 - single call",
    title: "Hi, can you please tell me my current balance?",
    requirement: "Hi, can you please tell me my current balance?",
    task: "User: Hi, can you please tell me my current balance?\nAI: Sure, I can help you with that. Can you please provide me your username and password for authentication?\nUser: My username is JohnDoe and password is pass123.\nAI: Thank you. Let me authenticate you first.",
    toolNames: ["QueryBalance", "GetUserToken"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "GetUserToken", args: {"username":"JohnDoe","password":"pass123"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/272",
    level: 1,
    category: "Level 1 - single call",
    title: "Hi, can you please tell me my current balance?",
    requirement: "Hi, can you please tell me my current balance?",
    task: "User: Hi, can you please tell me my current balance?\nAI: Sure, I can help you with that. Can you please provide me your username and password for authentication?\nUser: My username is JohnDoe and password is pass123.\nAI: Thank you. Let me authenticate you first.\nAI: Succeed. Now, let me check your balance.",
    toolNames: ["QueryBalance", "GetUserToken"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "QueryBalance", args: {"token":"a9s8d7f6g5h4j3k2l1"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/273",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me delete a scene named \"Relaxing Time\"?",
    requirement: "Can you help me delete a scene named \"Relaxing Time\"?",
    task: "User: Can you help me delete a scene named \"Relaxing Time\"?\nAI: Sure, I can do that. Just to confirm, you want me to delete the scene named \"Relaxing Time\". Is that correct?\nUser: Yes, that's correct.",
    toolNames: ["DeleteScene"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "DeleteScene", args: {"name":"Relaxing Time"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/274",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you cancel my appointment on April 10th with Dr. Davis under Davi…",
    requirement: "Can you cancel my appointment on April 10th with Dr. Davis under David Brown's name? The appointment ID is 56789012.",
    task: "User: Can you cancel my appointment on April 10th with Dr. Davis under David Brown's name? The appointment ID is 56789012.\nAI: Sure, I can help with that. Let me just confirm, you want to cancel the appointment on April 10th with Dr. Davis for David Brown, is that correct?\nUser: Yes, please.\nAI: Alright, I will cancel the registration now.",
    toolNames: ["RecordHealthData", "CancelRegistration"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "CancelRegistration", args: {"appointment_id":"56789012"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/275",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you cancel my appointment on April 10th with Dr. Davis under Davi…",
    requirement: "Can you cancel my appointment on April 10th with Dr. Davis under David Brown's name? The appointment ID is 56789012.",
    task: "User: Can you cancel my appointment on April 10th with Dr. Davis under David Brown's name? The appointment ID is 56789012.\nAI: Sure, I can help with that. Let me just confirm, you want to cancel the appointment on April 10th with Dr. Davis for David Brown, is that correct?\nUser: Yes, please.\nAI: Alright, I will cancel the registration now.\nAI: Your appointment has been cancelled successfully. Is there anything else I can help you with?\nUser: Can you record my blood pressure and heart rate from yesterday?\nAI: Sure, I can help with that. Before I process this request, I need to confirm that I have permission to access your health data. Do you have an existing user ID with our health service?\nUser: Yes, my user ID is 12345.\nAI: Great. Do you have that health data you want me to record?\nUser: Yes, my blood pressure was 120/80 and my heart rate was 80.\nAI: Alright, I will record your health data now.",
    toolNames: ["RecordHealthData", "CancelRegistration"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "RecordHealthData", args: {"user_id":"12345","time":"2023-04-09 12:00:00","health_data":"[{"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/276",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you tell me the appointments for Olivia Davis on October 10th, 20…",
    requirement: "Can you tell me the appointments for Olivia Davis on October 10th, 2023 with Dr. Smith?",
    task: "User: Can you tell me the appointments for Olivia Davis on October 10th, 2023 with Dr. Smith?\nAI: Sure! Let me check.",
    toolNames: ["QueryRegistration"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "QueryRegistration", args: {"patient_name":"Olivia Davis","date":"2023-10-10"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/277",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me modify a reminder with the description \"Submit report…",
    requirement: "Can you help me modify a reminder with the description \"Submit report\" at 9 am on March 17th, 2023?",
    task: "User: Can you help me modify a reminder with the description \"Submit report\" at 9 am on March 17th, 2023?\nAI: Sure, I can help with that. Can you please provide me your username, password, and email?\nUser: My username is testuser, password is testpass, and email is testuser@example.com.\nAI: Thank you. Let me authenticate you.",
    toolNames: ["DeleteAgenda", "ModifyReminder", "GetUserToken", "AddAgenda"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "GetUserToken", args: {"username":"testuser","password":"testpass"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/278",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me modify a reminder with the description \"Submit report…",
    requirement: "Can you help me modify a reminder with the description \"Submit report\" at 9 am on March 17th, 2023?",
    task: "User: Can you help me modify a reminder with the description \"Submit report\" at 9 am on March 17th, 2023?\nAI: Sure, I can help with that. Can you please provide me your username, password, and email?\nUser: My username is testuser, password is testpass, and email is testuser@example.com.\nAI: Thank you. Let me authenticate you.\nAI: Got it. Now, what is the description for the reminder and at what time should it be triggered?\nUser: The description is \"Submit report\" and it should be triggered at 9 am on March 17th, 2023.\nAI: Great.",
    toolNames: ["DeleteAgenda", "ModifyReminder", "GetUserToken", "AddAgenda"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "ModifyReminder", args: {"token":"p9o8i7u6y5t4k3e2w1q","content":"Submit report","time":"2023-03-17 09:00:00"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/279",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me modify a reminder with the description \"Submit report…",
    requirement: "Can you help me modify a reminder with the description \"Submit report\" at 9 am on March 17th, 2023?",
    task: "User: Can you help me modify a reminder with the description \"Submit report\" at 9 am on March 17th, 2023?\nAI: Sure, I can help with that. Can you please provide me your username, password, and email?\nUser: My username is testuser, password is testpass, and email is testuser@example.com.\nAI: Thank you. Let me authenticate you.\nAI: Got it. Now, what is the description for the reminder and at what time should it be triggered?\nUser: The description is \"Submit report\" and it should be triggered at 9 am on March 17th, 2023.\nAI: Great.\nAI: Done. Your reminder has been modified successfully. Anything else I can help with?\nUser: Yes, can you add an agenda item for March 20th, 2023, with the description \"Dinner with friends\" at the Cheesecake Factory?\nAI: Of course. Please provide me your username, password, and email for authentication\nUser: My username is testuser, password is testpass, and email is testuser@example.com.\nAI: Thank you. Let me authenticate you.",
    toolNames: ["DeleteAgenda", "ModifyReminder", "GetUserToken", "AddAgenda"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "GetUserToken", args: {"username":"testuser","password":"testpass"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/280",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me modify a reminder with the description \"Submit report…",
    requirement: "Can you help me modify a reminder with the description \"Submit report\" at 9 am on March 17th, 2023?",
    task: "User: Can you help me modify a reminder with the description \"Submit report\" at 9 am on March 17th, 2023?\nAI: Sure, I can help with that. Can you please provide me your username, password, and email?\nUser: My username is testuser, password is testpass, and email is testuser@example.com.\nAI: Thank you. Let me authenticate you.\nAI: Got it. Now, what is the description for the reminder and at what time should it be triggered?\nUser: The description is \"Submit report\" and it should be triggered at 9 am on March 17th, 2023.\nAI: Great.\nAI: Done. Your reminder has been modified successfully. Anything else I can help with?\nUser: Yes, can you add an agenda item for March 20th, 2023, with the description \"Dinner with friends\" at the Cheesecake Factory?\nAI: Of course. Please provide me your username, password, and email for authentication\nUser: My username is testuser, password is testpass, and email is testuser@example.com.\nAI: Thank you. Let me authenticate you.\nAI: Okay. What is the description, time, and location for the agenda item?\nUser: The description is \"Dinner with friends\", the time is March 20th, 2023 and the location is the Cheesecake Factory.\nAI: Got it.",
    toolNames: ["DeleteAgenda", "ModifyReminder", "GetUserToken", "AddAgenda"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "AddAgenda", args: {"token":"p9o8i7u6y5t4k3e2w1q","content":"Dinner with friends","time":"2023-03-20 00:00:00","location":"Cheesecake Factory"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/281",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me modify a reminder with the description \"Submit report…",
    requirement: "Can you help me modify a reminder with the description \"Submit report\" at 9 am on March 17th, 2023?",
    task: "User: Can you help me modify a reminder with the description \"Submit report\" at 9 am on March 17th, 2023?\nAI: Sure, I can help with that. Can you please provide me your username, password, and email?\nUser: My username is testuser, password is testpass, and email is testuser@example.com.\nAI: Thank you. Let me authenticate you.\nAI: Got it. Now, what is the description for the reminder and at what time should it be triggered?\nUser: The description is \"Submit report\" and it should be triggered at 9 am on March 17th, 2023.\nAI: Great.\nAI: Done. Your reminder has been modified successfully. Anything else I can help with?\nUser: Yes, can you add an agenda item for March 20th, 2023, with the description \"Dinner with friends\" at the Cheesecake Factory?\nAI: Of course. Please provide me your username, password, and email for authentication\nUser: My username is testuser, password is testpass, and email is testuser@example.com.\nAI: Thank you. Let me authenticate you.\nAI: Okay. What is the description, time, and location for the agenda item?\nUser: The description is \"Dinner with friends\", the time is March 20th, 2023 and the location is the Cheesecake Factory.\nAI: Got it.\nAI: All set. Your new agenda item has been added. Do you need assistance with anything else?\nUser: Yes, can you also delete the same agenda item that we just added?\nAI: Sure. May I know your authentication details again for deleting an agenda item?\nUser: My username is testuser, password is testpass, and email is testuser@example.com.\nAI: Got it.",
    toolNames: ["DeleteAgenda", "ModifyReminder", "GetUserToken", "AddAgenda"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "DeleteAgenda", args: {"token":"p9o8i7u6y5t4k3e2w1q","content":"Dinner with friends","time":"2023-03-20 00:00:00","location":"Cheesecake Factory"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/282",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you give me the key features of the software in this article - ht…",
    requirement: "Can you give me the key features of the software in this article - https://www.example.com/article-4.txt?",
    task: "User: Can you give me the key features of the software in this article - https://www.example.com/article-4.txt?\nAI: Sure, what's the question you want me to answer?\nUser: What are the key features of this software?\nAI: Let me check.",
    toolNames: ["DocumentQA"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "DocumentQA", args: {"url":"https://www.example.com/article-4.txt","question":"What are the key features of this software?"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/283",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you give me the key features of the software in this article - ht…",
    requirement: "Can you give me the key features of the software in this article - https://www.example.com/article-4.txt?",
    task: "User: Can you give me the key features of the software in this article - https://www.example.com/article-4.txt?\nAI: Sure, what's the question you want me to answer?\nUser: What are the key features of this software?\nAI: Let me check.\nAI: According to the article, Key features of this software include a user-friendly interface and powerful analytics tools.\nUser: That's great. Can you also tell me what platforms this software is compatible with?\nAI: Sure. What question should I ask?\nUser: Can you tell me what platforms is this software compatible with?\nAI: Ok, let me check.",
    toolNames: ["DocumentQA"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "DocumentQA", args: {"url":"https://www.example.com/article-4.txt","question":"What platforms is this software compatible with?"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/284",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you give me the key features of the software in this article - ht…",
    requirement: "Can you give me the key features of the software in this article - https://www.example.com/article-4.txt?",
    task: "User: Can you give me the key features of the software in this article - https://www.example.com/article-4.txt?\nAI: Sure, what's the question you want me to answer?\nUser: What are the key features of this software?\nAI: Let me check.\nAI: According to the article, Key features of this software include a user-friendly interface and powerful analytics tools.\nUser: That's great. Can you also tell me what platforms this software is compatible with?\nAI: Sure. What question should I ask?\nUser: Can you tell me what platforms is this software compatible with?\nAI: Ok, let me check.\nAI: The article states that this software is compatible with Windows, Mac, and Linux operating systems.\nUser: Great. And how about its customer support?\nAI: What would you like me to ask?\nUser: Can you tell me what the customer support is like for this software?\nAI: Ok, let me check.",
    toolNames: ["DocumentQA"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "DocumentQA", args: {"url":"https://www.example.com/article-4.txt","question":"What is the customer support like for this software?"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/285",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me book a hotel room?",
    requirement: "Can you help me book a hotel room?",
    task: "User: Can you help me book a hotel room?\nAI: Sure, I can help with that. What is the name of the hotel you want to book?\nUser: I want to book Marriott Hotel.\nAI: Great choice. What is your check-in date and check-out date?\nUser: My check-in date is 2022-05-20 and check-out date is 2022-05-22.\nAI: Okay, how many rooms do you want to book?\nUser: I need two rooms.\nAI: And how many adults and children will be staying in each room?\nUser: Two adults in each room and no children.\nAI: Okay, I will book two rooms for two adults in Marriott Hotel for 2022-05-20 to 2022-05-22.",
    toolNames: ["BookHotel"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "BookHotel", args: {"hotel_name":"Marriott Hotel","check_in_time":"2022-05-20","check_out_time":"2022-05-22","room_count":"2","adult_count":"2","child_count":"0"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/286",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me find information on abdominal pain?",
    requirement: "Can you help me find information on abdominal pain?",
    task: "User: Can you help me find information on abdominal pain?\nAI: Sure, I can help you with that. What specific information are you looking for?\nUser: Just general information about abdominal pain and any potential causes or treatments.\nAI: Okay, I understand. Let me use the SymptomSearch API to search for information on abdominal pain.",
    toolNames: ["SymptomSearch"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "SymptomSearch", args: {"symptom":"Abdominal pain"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/287",
    level: 1,
    category: "Level 1 - single call",
    title: "Hi, can you help me modify a reminder?",
    requirement: "Hi, can you help me modify a reminder?",
    task: "User: Hi, can you help me modify a reminder?\nAI: Of course! What do you want to modify about the reminder?\nUser: I need to change the content of the reminder.\nAI: Okay, I can help with that. Do you have a specific reminder in mind?\nUser: Yes, I need to change the content of the reminder for the proposal submission on March 25th at 2:00 PM.\nAI: Great. To modify the reminder, I will need your user token. Can you please provide your username and password?\nUser: My username is user3 and password is user3pass.\nAI: Thank you.",
    toolNames: ["ModifyReminder", "GetUserToken"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "GetUserToken", args: {"username":"user3","password":"user3pass"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/288",
    level: 1,
    category: "Level 1 - single call",
    title: "Hi, can you help me modify a reminder?",
    requirement: "Hi, can you help me modify a reminder?",
    task: "User: Hi, can you help me modify a reminder?\nAI: Of course! What do you want to modify about the reminder?\nUser: I need to change the content of the reminder.\nAI: Okay, I can help with that. Do you have a specific reminder in mind?\nUser: Yes, I need to change the content of the reminder for the proposal submission on March 25th at 2:00 PM.\nAI: Great. To modify the reminder, I will need your user token. Can you please provide your username and password?\nUser: My username is user3 and password is user3pass.\nAI: Thank you.\nAI: Now that I have your token, let's modify the reminder. What would you like the new content to be?\nUser: I want to change it to submit documents instead.",
    toolNames: ["ModifyReminder", "GetUserToken"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "ModifyReminder", args: {"token":"p9o8i7u6y5t4r3e2w1q","content":"Submit documents","time":"2023-03-25 14:00:00"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/289",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you please cancel my appointment for David Brown with Dr. Davis o…",
    requirement: "Can you please cancel my appointment for David Brown with Dr. Davis on April 10th, 2023 at 10:00 am?",
    task: "User: Can you please cancel my appointment for David Brown with Dr. Davis on April 10th, 2023 at 10:00 am?\nAI: Sure, I can help you with that. What's your appointment ID?\nUser: 56789012\nAI: I'm cancelling your appointment with ID 56789012.",
    toolNames: ["CancelRegistration"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "CancelRegistration", args: {"appointment_id":"56789012"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/290",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me delete my account?",
    requirement: "Can you help me delete my account?",
    task: "User: Can you help me delete my account?\nAI: Sure, I can help you with that. Can you please provide me your username and password?\nUser: My username is user3 and my password is user3pass.\nAI: Thank you. For security purposes, I need to authenticate your account first. Just a moment please.",
    toolNames: ["DeleteAccount", "GetUserToken"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "GetUserToken", args: {"username":"user3","password":"user3pass"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/291",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me delete my account?",
    requirement: "Can you help me delete my account?",
    task: "User: Can you help me delete my account?\nAI: Sure, I can help you with that. Can you please provide me your username and password?\nUser: My username is user3 and my password is user3pass.\nAI: Thank you. For security purposes, I need to authenticate your account first. Just a moment please.\nAI: Your account has been authenticated. Now, can you please confirm that you want to delete your account?\nUser: Yes, I want to delete my account.",
    toolNames: ["DeleteAccount", "GetUserToken"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "DeleteAccount", args: {"token":"p9o8i7u6y5t4r3e2w1q"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/292",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me register an appointment with a specific doctor on a s…",
    requirement: "Can you help me register an appointment with a specific doctor on a specific date?",
    task: "User: Can you help me register an appointment with a specific doctor on a specific date?\nAI: Sure, I can help you with that. Please provide me with the patient's name, doctor's name and the date of the appointment.\nUser: The patient's name is John Smith, the doctor's name is Dr. Johnson, and the date is June 1st, 2022.\nAI: Okay, I will register an appointment for John Smith with Dr. Johnson on June 1st, 2022. Just a moment please.",
    toolNames: ["AppointmentRegistration"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "AppointmentRegistration", args: {"patient_name":"John Smith","date":"2022-06-01","doctor_name":"Dr. Johnson"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/293",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you please check if there is any appointment for Olivia Davis wit…",
    requirement: "Can you please check if there is any appointment for Olivia Davis with Dr. Smith on 10th Oct 2023?",
    task: "User: Can you please check if there is any appointment for Olivia Davis with Dr. Smith on 10th Oct 2023?\nAI: Sure. Let me check.",
    toolNames: ["QueryRegistration"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "QueryRegistration", args: {"patient_name":"Olivia Davis","date":"2023-10-10"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/294",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you translate \"Hello\" to Spanish?",
    requirement: "Can you translate \"Hello\" to Spanish?",
    task: "User: Can you translate \"Hello\" to Spanish?\nAI: Sure, I can help with that.",
    toolNames: ["Translate"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "Translate", args: {"src":"Hello","tgt_lang":"es"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/295",
    level: 1,
    category: "Level 1 - single call",
    title: "Hi, can you cancel my appointment on October 10th with Dr. Smith? My…",
    requirement: "Hi, can you cancel my appointment on October 10th with Dr. Smith? My appointment ID is 90123456.",
    task: "User: Hi, can you cancel my appointment on October 10th with Dr. Smith? My appointment ID is 90123456.\nAI: Sure, I can help you with that. I just need your appointment ID which is 90123456.",
    toolNames: ["CancelRegistration"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "CancelRegistration", args: {"appointment_id":"90123456"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/296",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you recognize speech from an audio URL?",
    requirement: "Can you recognize speech from an audio URL?",
    task: "User: Can you recognize speech from an audio URL?\nAI: Yes, I can. Which URL should I use?\nUser: https://example.com/voice22.wav.\nAI: Okay, let me recognize the speech.",
    toolNames: ["SpeechRecognition"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "SpeechRecognition", args: {"url":"https://example.com/voice22.wav"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/297",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me find information about my headache symptoms?",
    requirement: "Can you help me find information about my headache symptoms?",
    task: "User: Can you help me find information about my headache symptoms?\nAI: Sure, I can search for information about your headache symptoms.",
    toolNames: ["EmergencyKnowledge"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "EmergencyKnowledge", args: {"symptom":"headache"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/298",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me calculate (5*6)/(2+3)?",
    requirement: "Can you help me calculate (5*6)/(2+3)?",
    task: "User: Can you help me calculate (5*6)/(2+3)?\nAI: Sure, I can help you with that.",
    toolNames: ["QueryHistoryToday", "Calculator"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "Calculator", args: {"formula":"(5*6)/(2+3)"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/299",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me calculate (5*6)/(2+3)?",
    requirement: "Can you help me calculate (5*6)/(2+3)?",
    task: "User: Can you help me calculate (5*6)/(2+3)?\nAI: Sure, I can help you with that.\nAI: The result is 6.0.\nUser: Can you show me the historical events that happened on December 10th?\nAI: Sure, I can help you with that.",
    toolNames: ["QueryHistoryToday", "Calculator"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "QueryHistoryToday", args: {"date":"12-10"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/300",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you modify my alarm from 8:00AM to 9:00AM on March 16, 2023?",
    requirement: "Can you modify my alarm from 8:00AM to 9:00AM on March 16, 2023?",
    task: "User: Can you modify my alarm from 8:00AM to 9:00AM on March 16, 2023?\nAI: Sure, please provide your username.\nUser: JohnDoe\nAI: Thanks. Now please provide your password.\nUser: pass123\nAI: Thanks, let me authenticate you.",
    toolNames: ["ModifyAlarm", "GetUserToken"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "GetUserToken", args: {"username":"JohnDoe","password":"pass123"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/301",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you modify my alarm from 8:00AM to 9:00AM on March 16, 2023?",
    requirement: "Can you modify my alarm from 8:00AM to 9:00AM on March 16, 2023?",
    task: "User: Can you modify my alarm from 8:00AM to 9:00AM on March 16, 2023?\nAI: Sure, please provide your username.\nUser: JohnDoe\nAI: Thanks. Now please provide your password.\nUser: pass123\nAI: Thanks, let me authenticate you.\nAI: Great, now what is the new time for your alarm on March 16, 2023?\nUser: I want it to be 9:00AM to 10:00AM.\nAI: OK.",
    toolNames: ["ModifyAlarm", "GetUserToken"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "ModifyAlarm", args: {"token":"a9s8d7f6g5h4j3k2l1","from_time":"2023-03-16 07:00:00","to_time":"2023-03-16 08:00:00"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/302",
    level: 1,
    category: "Level 1 - single call",
    title: "can you check my registration status for March 25th, 2023?",
    requirement: "can you check my registration status for March 25th, 2023?",
    task: "User: can you check my registration status for March 25th, 2023?\nAI: Sure, may I have your patient ID, please?\nUser: 34567890\nAI: Got it. And what is your full name, please?\nUser: Robert Lee\nAI: Thanks. Checking your registration status for March 25th, 2023... Looks like you have an appointment with Dr. Kim on that day. Here are the appointment details: [{'patient_name': 'Robert Lee', 'date': '2023-03-25', 'doctor_name': 'Dr. Kim'}]",
    toolNames: ["EmergencyKnowledge", "QueryRegistration"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "QueryRegistration", args: {"patient_name":"Robert Lee","date":"2023-03-25"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/303",
    level: 1,
    category: "Level 1 - single call",
    title: "can you check my registration status for March 25th, 2023?",
    requirement: "can you check my registration status for March 25th, 2023?",
    task: "User: can you check my registration status for March 25th, 2023?\nAI: Sure, may I have your patient ID, please?\nUser: 34567890\nAI: Got it. And what is your full name, please?\nUser: Robert Lee\nAI: Thanks. Checking your registration status for March 25th, 2023... Looks like you have an appointment with Dr. Kim on that day. Here are the appointment details: [{'patient_name': 'Robert Lee', 'date': '2023-03-25', 'doctor_name': 'Dr. Kim'}]\nAI: Is there anything else I can help with?\nUser: Actually, I have been experiencing shortness of breath lately. Can you give me any advice or first aid tips?\nAI: I'm sorry to hear that. Please tell me more about your symptoms.\nUser: I feel like my breathing is labored and it's harder to catch my breath.\nAI: I see. Let me look that up for you... Here are some possible diseases that may cause your symptoms. They are Asthma and Pneumonia. Here are the first aid tips: [{\"name\": \"Asthma\", \"aid\": \"Treatment may involve inhalers or nebulizers to open the airways, as well as medications to manage inflammation and prevent attacks.\"}, {\"name\": \"Pneumonia\", \"aid\": \"Treatment may involve antibiotics, rest, and fluids to help the body fight the infection and recover.\"}]",
    toolNames: ["EmergencyKnowledge", "QueryRegistration"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "EmergencyKnowledge", args: {"symptom":"shortness of breath"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/304",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me check if I have an appointment on April 12th, 2023 wi…",
    requirement: "Can you help me check if I have an appointment on April 12th, 2023 with Dr. Smith?",
    task: "User: Can you help me check if I have an appointment on April 12th, 2023 with Dr. Smith?\nAI: Sure. Please tell me your patient name.\nUser: My name is John Doe.\nAI: Alright. Let me check for you.",
    toolNames: ["AppointmentRegistration", "QueryRegistration"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "QueryRegistration", args: {"patient_name":"John Doe","date":"2023-04-12"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/305",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me check if I have an appointment on April 12th, 2023 wi…",
    requirement: "Can you help me check if I have an appointment on April 12th, 2023 with Dr. Smith?",
    task: "User: Can you help me check if I have an appointment on April 12th, 2023 with Dr. Smith?\nAI: Sure. Please tell me your patient name.\nUser: My name is John Doe.\nAI: Alright. Let me check for you.\nAI: According to our records, you have an appointment with Dr. Smith on April 12th, 2023 at 2pm. Would you like me to reschedule that appointment?\nUser: Yes, please. Can you help me schedule it for April 15th, 2023 at 10am?\nAI: Certainly. Let me schedule that appointment for you.",
    toolNames: ["AppointmentRegistration", "QueryRegistration"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "AppointmentRegistration", args: {"patient_name":"John Doe","date":"2023-04-15","doctor_name":"Dr. Smith"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/306",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me schedule a meeting?",
    requirement: "Can you help me schedule a meeting?",
    task: "User: Can you help me schedule a meeting?\nAI: Sure, I can help you with that. What would be the meeting topic?\nUser: It's about project updates.\nAI: Great! When should it start and end?\nUser: Let's schedule it for 2022-12-15 at 2 PM, and it should end by 4 PM.\nAI: And where would you like to hold the meeting?\nUser: We can host it in our conference room.\nAI: Who will be attending the meeting?\nUser: John Smith, Jane Doe and Adam Lee.\nAI: Okay. To schedule this meeting, I need to authenticate you. What is your username and password?\nUser: My username is JohnDoe, and my password is pass123.",
    toolNames: ["GetUserToken", "AddMeeting"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "GetUserToken", args: {"username":"JohnDoe","password":"pass123"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/307",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me schedule a meeting?",
    requirement: "Can you help me schedule a meeting?",
    task: "User: Can you help me schedule a meeting?\nAI: Sure, I can help you with that. What would be the meeting topic?\nUser: It's about project updates.\nAI: Great! When should it start and end?\nUser: Let's schedule it for 2022-12-15 at 2 PM, and it should end by 4 PM.\nAI: And where would you like to hold the meeting?\nUser: We can host it in our conference room.\nAI: Who will be attending the meeting?\nUser: John Smith, Jane Doe and Adam Lee.\nAI: Okay. To schedule this meeting, I need to authenticate you. What is your username and password?\nUser: My username is JohnDoe, and my password is pass123.\nAI: Okay, I have your token now.",
    toolNames: ["GetUserToken", "AddMeeting"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "AddMeeting", args: {"token":"a9s8d7f6g5h4j3k2l1","meeting_topic":"project updates","start_time":"2022-12-15 14:00:00","end_time":"2022-12-15 16:00:00","location":"conference room","attendees":"["} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/308",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you check the registration for Alice Chen on June 15, 2023 with D…",
    requirement: "Can you check the registration for Alice Chen on June 15, 2023 with Dr. Wang?",
    task: "User: Can you check the registration for Alice Chen on June 15, 2023 with Dr. Wang?\nAI: Sure, let me check.",
    toolNames: ["SymptomSearch", "RecordHealthData", "QueryRegistration"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "QueryRegistration", args: {"patient_name":"Alice Chen","date":"2023-06-15"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/309",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you check the registration for Alice Chen on June 15, 2023 with D…",
    requirement: "Can you check the registration for Alice Chen on June 15, 2023 with Dr. Wang?",
    task: "User: Can you check the registration for Alice Chen on June 15, 2023 with Dr. Wang?\nAI: Sure, let me check.\nAI: According to the registration, Alice Chen has an appointment with Dr. Wang on June 15, 2023.\nUser: Can you search for diseases related to nausea?\nAI: OK.",
    toolNames: ["SymptomSearch", "RecordHealthData", "QueryRegistration"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "SymptomSearch", args: {"symptom":"nausea"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/310",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you check the registration for Alice Chen on June 15, 2023 with D…",
    requirement: "Can you check the registration for Alice Chen on June 15, 2023 with Dr. Wang?",
    task: "User: Can you check the registration for Alice Chen on June 15, 2023 with Dr. Wang?\nAI: Sure, let me check.\nAI: According to the registration, Alice Chen has an appointment with Dr. Wang on June 15, 2023.\nUser: Can you search for diseases related to nausea?\nAI: OK.\nAI: I found two possible diseases related to nausea, Gastroenteritis and Migraine. Do you want me to give you more details about them?\nUser: Yes, please.\nAI: For Gastroenteritis, it is an infection or inflammation of the digestive tract that can cause nausea, vomiting, diarrhea, and other symptoms. The treatment may involve rest, fluids, and medications to manage symptoms and prevent dehydration. For Migraine, it is a neurological condition characterized by recurrent headaches, often accompanied by other symptoms such as nausea, vomiting, and sensitivity to light and sound. The treatment may involve medications to manage symptoms and prevent attacks, lifestyle changes to avoid triggers, and in some cases, preventive medications.\nUser: Can you record my blood pressure and heart rate data?\nAI: Sure. Please tell me the data and the time.\nUser: My blood pressure is 120/80 and my heart rate is 80. The time is 2023-06-15 14:30:00.",
    toolNames: ["SymptomSearch", "RecordHealthData", "QueryRegistration"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "RecordHealthData", args: {"user_id":"1234","time":"2023-06-15 14:30:00","health_data":"[{"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/311",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you record my blood pressure and heart rate data?",
    requirement: "Can you record my blood pressure and heart rate data?",
    task: "User: Can you record my blood pressure and heart rate data?\nAI: Sure, I can help you with that. Please provide me with your user ID, time, blood pressure, and heart rate data.\nUser: My user ID is 1234, time is 2022-01-01 10:00:00, blood pressure is 110/70, and heart rate is 90.",
    toolNames: ["RecordHealthData"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "RecordHealthData", args: {"user_id":"1234","time":"2022-01-01 10:00:00","health_data":"[{"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/312",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me find the answer to a question in a specific document?",
    requirement: "Can you help me find the answer to a question in a specific document?",
    task: "User: Can you help me find the answer to a question in a specific document?\nAI: Yes, of course. What is the URL of the document?\nUser: The URL is https://www.example.com/article-4.txt.\nAI: What is the question you want to answer from this document?\nUser: What operating systems is this software compatible with?",
    toolNames: ["DocumentQA"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "DocumentQA", args: {"url":"https://www.example.com/article-4.txt","question":"What operating systems is this software compatible with?"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/313",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me modify a reminder for paying bills on March 20th at 1…",
    requirement: "Can you help me modify a reminder for paying bills on March 20th at 12 PM?",
    task: "User: Can you help me modify a reminder for paying bills on March 20th at 12 PM?\nAI: Sure. I need your token, what is it?\nUser: I don't know, how can I get it?\nAI: Let me check. What is your email and password?\nUser: My email is admin@example.com and password is adminpass.",
    toolNames: ["ModifyReminder", "GetUserToken"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "GetUserToken", args: {"username":"admin","password":"adminpass"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/314",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me modify a reminder for paying bills on March 20th at 1…",
    requirement: "Can you help me modify a reminder for paying bills on March 20th at 12 PM?",
    task: "User: Can you help me modify a reminder for paying bills on March 20th at 12 PM?\nAI: Sure. I need your token, what is it?\nUser: I don't know, how can I get it?\nAI: Let me check. What is your email and password?\nUser: My email is admin@example.com and password is adminpass.\nAI: Your token is m9n8b7v6c5x4z3a2s1. Now, please give me the description of the reminder.\nUser: The content is 'Pay bills' and the time is '2023-03-20 12:00:00'.",
    toolNames: ["ModifyReminder", "GetUserToken"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "ModifyReminder", args: {"token":"m9n8b7v6c5x4z3a2s1","content":"Pay bills","time":"2023-03-20 12:00:00"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/315",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me find my upcoming appointment with Dr. Smith?",
    requirement: "Can you help me find my upcoming appointment with Dr. Smith?",
    task: "User: Can you help me find my upcoming appointment with Dr. Smith?\nAI: Sure, I can help you with that. What is the date of your appointment?\nUser: It's on October 10th, 2023.\nAI: And, what is your name?\nUser: My name is Olivia Davis.\nAI: Great. Let me check.",
    toolNames: ["QueryRegistration"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "QueryRegistration", args: {"patient_name":"Olivia Davis","date":"2023-10-10"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/316",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you delete my account?",
    requirement: "Can you delete my account?",
    task: "User: Can you delete my account?\nAI: Sure, I can help you with that. Can you please provide me with your username and password for authorization purposes?\nUser: My username is user3 and my password is user3pass.\nAI: Thank you. One moment while I authenticate your account.",
    toolNames: ["DeleteAccount", "GetUserToken"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "GetUserToken", args: {"username":"user3","password":"user3pass"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/317",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you delete my account?",
    requirement: "Can you delete my account?",
    task: "User: Can you delete my account?\nAI: Sure, I can help you with that. Can you please provide me with your username and password for authorization purposes?\nUser: My username is user3 and my password is user3pass.\nAI: Thank you. One moment while I authenticate your account.\nAI: Your account has been authenticated successfully. Now, please confirm that you want to delete your account.\nUser: Yes, I want to delete it.",
    toolNames: ["DeleteAccount", "GetUserToken"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "DeleteAccount", args: {"token":"p9o8i7u6y5t4r3e2w1q"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/318",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me book an appointment with Dr. Smith?",
    requirement: "Can you help me book an appointment with Dr. Smith?",
    task: "User: Can you help me book an appointment with Dr. Smith?\nAI: Sure, I can help you with that. To register the appointment, I need the name of the patient, doctor, and date of appointment. What is your name, the doctor's name, and the date you want to book?\nUser: My name is John, the doctor's name is Smith and I want to book the appointment on 2022-08-15.\nAI: Great! To confirm, you want to book an appointment with Dr. Smith on Monday. What time would you prefer?\nUser: At 2 PM.\nAI: Thank you.",
    toolNames: ["AppointmentRegistration"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "AppointmentRegistration", args: {"patient_name":"John","date":"2022-08-15","doctor_name":"Smith"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/319",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you delete the agenda of picking up my dry cleaning on March 21st…",
    requirement: "Can you delete the agenda of picking up my dry cleaning on March 21st at the Cleaners?",
    task: "User: Can you delete the agenda of picking up my dry cleaning on March 21st at the Cleaners?\nAI: Sure, I can help you with that. To delete the agenda, I need your token. Can you please provide me your username and password?\nUser: My username is newuser and my password is newpass.\nAI: Thank you. Let me authenticate your account.",
    toolNames: ["DeleteAgenda", "GetUserToken"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "GetUserToken", args: {"username":"newuser","password":"newpass"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/320",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you delete the agenda of picking up my dry cleaning on March 21st…",
    requirement: "Can you delete the agenda of picking up my dry cleaning on March 21st at the Cleaners?",
    task: "User: Can you delete the agenda of picking up my dry cleaning on March 21st at the Cleaners?\nAI: Sure, I can help you with that. To delete the agenda, I need your token. Can you please provide me your username and password?\nUser: My username is newuser and my password is newpass.\nAI: Thank you. Let me authenticate your account.\nAI: Okay, I have received the token. Now, please provide me the exact time of the agenda.\nUser: It's on March 21st.\nAI: Great, and what time?\nUser: I need to pick it up at 3 PM.\nAI: Perfect, thank you.",
    toolNames: ["DeleteAgenda", "GetUserToken"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "DeleteAgenda", args: {"token":"l9k8j7h6g5f4d3s2a1","content":"Pick up dry cleaning","time":"2023-03-21 15:00:00","location":"Cleaners"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/321",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me modify a reminder for my conference?",
    requirement: "Can you help me modify a reminder for my conference?",
    task: "User: Can you help me modify a reminder for my conference?\nAI: Sure! What is the new content and time for your reminder?\nUser: The new content is \"Submit proposal\" and the new time is \"2023-03-25 14:00:00\".\nAI: Alright. I need to authenticate you first. Please provide me with your username and password.\nUser: My username is user3 and my password is user3pass.",
    toolNames: ["ModifyReminder", "GetUserToken"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "GetUserToken", args: {"username":"user3","password":"user3pass"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/322",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me modify a reminder for my conference?",
    requirement: "Can you help me modify a reminder for my conference?",
    task: "User: Can you help me modify a reminder for my conference?\nAI: Sure! What is the new content and time for your reminder?\nUser: The new content is \"Submit proposal\" and the new time is \"2023-03-25 14:00:00\".\nAI: Alright. I need to authenticate you first. Please provide me with your username and password.\nUser: My username is user3 and my password is user3pass.\nAI: Your authentication was successful. Now, let me modify your reminder.",
    toolNames: ["ModifyReminder", "GetUserToken"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "ModifyReminder", args: {"token":"p9o8i7u6y5t4r3e2w1q","content":"Submit proposal","time":"2023-03-25 14:00:00"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/323",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me book a hotel room for two adults and one child?",
    requirement: "Can you help me book a hotel room for two adults and one child?",
    task: "User: Can you help me book a hotel room for two adults and one child?\nAI: Sure, where do you want to book the hotel?\nUser: How about the Hilton in San Francisco?\nAI: Okay, what are the check-in and check-out dates?\nUser: I want to check in on August 10th and check out on August 15th.\nAI: How many rooms do you need?\nUser: Just one room for all of us.\nAI: And how many adults and children will be staying in the room?\nUser: Two adults and one child.\nAI: Alright, let me check for availability.",
    toolNames: ["BookHotel"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "BookHotel", args: {"hotel_name":"Hilton San Francisco","check_in_time":"2023-08-10","check_out_time":"2023-08-15","room_count":"1","adult_count":"2","child_count":"1"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/324",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you tell me my next appointment on March 25th, 2023?",
    requirement: "Can you tell me my next appointment on March 25th, 2023?",
    task: "User: Can you tell me my next appointment on March 25th, 2023?\nAI: Sure. What is your name?\nUser: My name is Robert Lee.",
    toolNames: ["EmergencyKnowledge", "QueryRegistration"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "QueryRegistration", args: {"patient_name":"Robert Lee","date":"2023-03-25"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/325",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you tell me my next appointment on March 25th, 2023?",
    requirement: "Can you tell me my next appointment on March 25th, 2023?",
    task: "User: Can you tell me my next appointment on March 25th, 2023?\nAI: Sure. What is your name?\nUser: My name is Robert Lee.\nAI: According to my records, your next appointment on March 25th, 2023 is with Dr. Kim.\nUser: Thanks. Can you also give me information about shortness of breath?\nAI: Sure. What would you like to know about?\nUser: Can you give me some possible diseases and first-aid methods?",
    toolNames: ["EmergencyKnowledge", "QueryRegistration"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "EmergencyKnowledge", args: {"symptom":"shortness of breath"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/326",
    level: 1,
    category: "Level 1 - single call",
    title: "I forgot my password. Can you help me reset it?",
    requirement: "I forgot my password. Can you help me reset it?",
    task: "User: I forgot my password. Can you help me reset it?\nAI: Sure, I can help you with that. May I know your username and email address?\nUser: My username is admin and my email address is admin@example.com.\nAI: Okay.",
    toolNames: ["ForgotPassword"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "ForgotPassword", args: {"status":"Forgot Password","username":"admin","email":"admin@example.com"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/327",
    level: 1,
    category: "Level 1 - single call",
    title: "I forgot my password. Can you help me reset it?",
    requirement: "I forgot my password. Can you help me reset it?",
    task: "User: I forgot my password. Can you help me reset it?\nAI: Sure, I can help you with that. May I know your username and email address?\nUser: My username is admin and my email address is admin@example.com.\nAI: Okay.\nAI: I have initiated the password reset process. You'll receive a verification code in your email shortly.\nUser: Great, I have received the verification code. What should I do next?\nAI: Now we need to reset the password using the verification code. Can you please provide me the verification code and the new password you want to set?\nUser: The verification code is 970420 and the new password is mynewpassword.\nAI: Perfect.",
    toolNames: ["ForgotPassword"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "ForgotPassword", args: {"status":"Verification Code","verification_code":"970420","new_password":"mynewpassword"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/328",
    level: 1,
    category: "Level 1 - single call",
    title: "Hi, can you help me delete a meeting reservation?",
    requirement: "Hi, can you help me delete a meeting reservation?",
    task: "User: Hi, can you help me delete a meeting reservation?\nAI: Sure, I can assist you with that. What's the meeting topic and start time?\nUser: The meeting topic is \"New Employee Orientation\" and the start time is \"2023-03-27 09:00:00\".\nAI: Alright, let me check if I have your token. Can you please provide me with your username and password?\nUser: My username is \"newuser\" and my password is \"newpass\".",
    toolNames: ["GetUserToken", "DeleteMeeting"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "GetUserToken", args: {"username":"newuser","password":"newpass"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/329",
    level: 1,
    category: "Level 1 - single call",
    title: "Hi, can you help me delete a meeting reservation?",
    requirement: "Hi, can you help me delete a meeting reservation?",
    task: "User: Hi, can you help me delete a meeting reservation?\nAI: Sure, I can assist you with that. What's the meeting topic and start time?\nUser: The meeting topic is \"New Employee Orientation\" and the start time is \"2023-03-27 09:00:00\".\nAI: Alright, let me check if I have your token. Can you please provide me with your username and password?\nUser: My username is \"newuser\" and my password is \"newpass\".\nAI: Thank you. I have received your token. Now, can you also provide me with the end time, location, and attendees of the meeting?\nUser: The end time is \"2023-03-27 11:00:00\", the location is \"Training Room\", and the attendees are \"David Wang\", \"Amy Chen\", and \"Erica Liu\".",
    toolNames: ["GetUserToken", "DeleteMeeting"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "DeleteMeeting", args: {"token":"l9k8j7h6g5f4d3s2a1","meeting_topic":"New Employee Orientation","start_time":"2023-03-27 09:00:00","end_time":"2023-03-27 11:00:00","location":"Training Room","attendees":"["} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/330",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me modify a meeting reservation?",
    requirement: "Can you help me modify a meeting reservation?",
    task: "User: Can you help me modify a meeting reservation?\nAI: Sure, I can assist you with that. What changes do you want to make?\nUser: I want to change the time and location of the meeting.\nAI: Alright. To modify a meeting reservation, I need some information such as meeting topic, start time, end time, location and attendees. Could you please provide these details?\nUser: The meeting topic is \"New Employee Orientation\", the start time is \"2023-03-27 09:00:00\", the end time is \"2023-03-27 11:00:00\", the location is \"Training Room\" and the attendees are \"David Wang\", \"Amy Chen\" and \"Erica Liu\".\nAI: Thank you for providing the details. May I know your username?\nUser: My username is \"newuser\" and password is \"newpass\"",
    toolNames: ["ModifyMeeting", "GetUserToken"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "GetUserToken", args: {"username":"newuser","password":"newpass"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/331",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me modify a meeting reservation?",
    requirement: "Can you help me modify a meeting reservation?",
    task: "User: Can you help me modify a meeting reservation?\nAI: Sure, I can assist you with that. What changes do you want to make?\nUser: I want to change the time and location of the meeting.\nAI: Alright. To modify a meeting reservation, I need some information such as meeting topic, start time, end time, location and attendees. Could you please provide these details?\nUser: The meeting topic is \"New Employee Orientation\", the start time is \"2023-03-27 09:00:00\", the end time is \"2023-03-27 11:00:00\", the location is \"Training Room\" and the attendees are \"David Wang\", \"Amy Chen\" and \"Erica Liu\".\nAI: Thank you for providing the details. May I know your username?\nUser: My username is \"newuser\" and password is \"newpass\"\nAI: I have retrieved your authentication token. Now, I will modify your meeting reservation.",
    toolNames: ["ModifyMeeting", "GetUserToken"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "ModifyMeeting", args: {"token":"l9k8j7h6g5f4d3s2a1","meeting_topic":"New Employee Orientation","start_time":"2023-03-27 09:00:00","end_time":"2023-03-27 11:00:00","location":"Training Room","attendees":"["} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/332",
    level: 1,
    category: "Level 1 - single call",
    title: "Hi, can you help me delete an alarm for 6:30 AM on March 20, 2023?",
    requirement: "Hi, can you help me delete an alarm for 6:30 AM on March 20, 2023?",
    task: "User: Hi, can you help me delete an alarm for 6:30 AM on March 20, 2023?\nAI: Sure, do you have an account with us?\nUser: Yes, my email is janesmith@example.com.\nAI: Alright, I need your username and password to authenticate you. Please provide me with them.\nUser: My username is JaneSmith and my password is password.\nAI: Let me get your token.",
    toolNames: ["DeleteAlarm", "GetUserToken"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "GetUserToken", args: {"username":"JaneSmith","password":"password"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/333",
    level: 1,
    category: "Level 1 - single call",
    title: "Hi, can you help me delete an alarm for 6:30 AM on March 20, 2023?",
    requirement: "Hi, can you help me delete an alarm for 6:30 AM on March 20, 2023?",
    task: "User: Hi, can you help me delete an alarm for 6:30 AM on March 20, 2023?\nAI: Sure, do you have an account with us?\nUser: Yes, my email is janesmith@example.com.\nAI: Alright, I need your username and password to authenticate you. Please provide me with them.\nUser: My username is JaneSmith and my password is password.\nAI: Let me get your token.\nAI: I have received your token. Now, what time should I delete the alarm for?\nUser: 6:30 AM on March 20, 2023.\nAI: Okay. I will delete that alarm for you.",
    toolNames: ["DeleteAlarm", "GetUserToken"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "DeleteAlarm", args: {"token":"o8i7u6y5t4r3e2w1q0","time":"2023-03-20 06:30:00"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/334",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me send an email to john@example.com with subject \"Meeti…",
    requirement: "Can you help me send an email to john@example.com with subject \"Meeting Reminder\" and content \"Don't forget our meeting tomorrow at 2pm.\"?",
    task: "User: Can you help me send an email to john@example.com with subject \"Meeting Reminder\" and content \"Don't forget our meeting tomorrow at 2pm.\"?\nAI: Sure, I can help you with that.",
    toolNames: ["SendEmail"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "SendEmail", args: {"receiver":"john@example.com","subject":"Meeting Reminder","content":"Don"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/335",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me find my upcoming appointment with Dr. Smith on Octobe…",
    requirement: "Can you help me find my upcoming appointment with Dr. Smith on October 10th, 2023 under the name Olivia Davis with patient ID 90123456?",
    task: "User: Can you help me find my upcoming appointment with Dr. Smith on October 10th, 2023 under the name Olivia Davis with patient ID 90123456?\nAI: Sure, let me check for you.",
    toolNames: ["QueryRegistration"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "QueryRegistration", args: {"patient_name":"Olivia Davis","date":"2023-10-10"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/336",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you play \"Shape of You\" by Ed Sheeran?",
    requirement: "Can you play \"Shape of You\" by Ed Sheeran?",
    task: "User: Can you play \"Shape of You\" by Ed Sheeran?\nAI: Sure, playing \"Shape of You\" by Ed Sheeran now.",
    toolNames: ["PlayMusic"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "PlayMusic", args: {"music_name":"Shape of You"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/337",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you add a schedule for me at 2pm on September 12th called \"Meetin…",
    requirement: "Can you add a schedule for me at 2pm on September 12th called \"Meeting with John\" at the office?",
    task: "User: Can you add a schedule for me at 2pm on September 12th called \"Meeting with John\" at the office?\nAI: Sure, I can add that schedule for you. When would you like the alarm to remind you?\nUser: Can you remind me 10 minutes before the schedule?\nAI: Absolutely. To schedule the meeting, I first need to authenticate your account. Please provide your username, email, and password.\nUser: My username is JaneSmith, my email is janesmith@example.com, and my password is password.\nAI: Thank you.",
    toolNames: ["AddAlarm", "GetUserToken", "AddAgenda"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "GetUserToken", args: {"username":"JaneSmith","password":"password"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/338",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you add a schedule for me at 2pm on September 12th called \"Meetin…",
    requirement: "Can you add a schedule for me at 2pm on September 12th called \"Meeting with John\" at the office?",
    task: "User: Can you add a schedule for me at 2pm on September 12th called \"Meeting with John\" at the office?\nAI: Sure, I can add that schedule for you. When would you like the alarm to remind you?\nUser: Can you remind me 10 minutes before the schedule?\nAI: Absolutely. To schedule the meeting, I first need to authenticate your account. Please provide your username, email, and password.\nUser: My username is JaneSmith, my email is janesmith@example.com, and my password is password.\nAI: Thank you.\nAI: I have retrieved your authentication token. Now I will add the schedule and alarm for you.",
    toolNames: ["AddAlarm", "GetUserToken", "AddAgenda"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "AddAgenda", args: {"token":"o8i7u6y5t4r3e2w1q0","content":"Meeting with John at the office","time":"2023-09-12 14:00:00","location":"office"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/339",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you add a schedule for me at 2pm on September 12th called \"Meetin…",
    requirement: "Can you add a schedule for me at 2pm on September 12th called \"Meeting with John\" at the office?",
    task: "User: Can you add a schedule for me at 2pm on September 12th called \"Meeting with John\" at the office?\nAI: Sure, I can add that schedule for you. When would you like the alarm to remind you?\nUser: Can you remind me 10 minutes before the schedule?\nAI: Absolutely. To schedule the meeting, I first need to authenticate your account. Please provide your username, email, and password.\nUser: My username is JaneSmith, my email is janesmith@example.com, and my password is password.\nAI: Thank you.\nAI: I have retrieved your authentication token. Now I will add the schedule and alarm for you.\nAI: I have added the schedule, and now I will set the alarm for you.",
    toolNames: ["AddAlarm", "GetUserToken", "AddAgenda"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "AddAlarm", args: {"token":"o8i7u6y5t4r3e2w1q0","time":"2023-09-12 13:50:00"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/340",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me delete a scene named \"Movie Time\"?",
    requirement: "Can you help me delete a scene named \"Movie Time\"?",
    task: "User: Can you help me delete a scene named \"Movie Time\"?\nAI: Sure, I can assist with that. Deleting scene named \"Movie Time\".",
    toolNames: ["DeleteScene"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "DeleteScene", args: {"name":"Movie Time"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/341",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you book a hotel room for me?",
    requirement: "Can you book a hotel room for me?",
    task: "User: Can you book a hotel room for me?\nAI: Sure, I can help you with that. Can you tell me the name of the hotel you want to book?\nUser: It's Hilton.\nAI: Great! And when do you want to check in?\nUser: Next Monday. 2022-03-14.\nAI: And when do you plan to check out?\nUser: Friday.\nAI: How many rooms do you need?\nUser: Two.\nAI: And how many adults and children will be staying?\nUser: Two adults and one child.",
    toolNames: ["BookHotel"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "BookHotel", args: {"hotel_name":"Hilton","check_in_time":"2022-03-14","check_out_time":"2022-03-18","room_count":"2","adult_count":"2","child_count":"1"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/342",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me delete a scene called \"Bedtime\"?",
    requirement: "Can you help me delete a scene called \"Bedtime\"?",
    task: "User: Can you help me delete a scene called \"Bedtime\"?\nAI: Sure, let me handle that for you.",
    toolNames: ["DeleteScene"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "DeleteScene", args: {"name":"Bedtime"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/343",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you cancel my appointment with ID 56789012 for David Brown with D…",
    requirement: "Can you cancel my appointment with ID 56789012 for David Brown with Dr. Davis on April 10, 2023?",
    task: "User: Can you cancel my appointment with ID 56789012 for David Brown with Dr. Davis on April 10, 2023?\nAI: Sure, I can help you with that.",
    toolNames: ["RecordHealthData", "CancelRegistration"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "CancelRegistration", args: {"appointment_id":"56789012"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/344",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you cancel my appointment with ID 56789012 for David Brown with D…",
    requirement: "Can you cancel my appointment with ID 56789012 for David Brown with Dr. Davis on April 10, 2023?",
    task: "User: Can you cancel my appointment with ID 56789012 for David Brown with Dr. Davis on April 10, 2023?\nAI: Sure, I can help you with that.\nAI: Your appointment for David Brown with Dr. Davis on April 10, 2023 has been cancelled.\nUser: Thank you.\nAI: Is there anything else I can help you with?\nUser: Yes, I would like to record my health data for today.\nAI: Sure, what is your user ID, time and health data?\nUser: My user ID is 123456, time is 2023-04-26 09:00:00, and health data is [{'name': 'blood_pressure', 'value': '130/90'}, {'name': 'heart_rate', 'value': '75'}]\nAI: Great! I will submit this data for you.",
    toolNames: ["RecordHealthData", "CancelRegistration"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "RecordHealthData", args: {"user_id":"123456","time":"2023-04-26 09:00:00","health_data":"[{"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/345",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you play the music \"Shape of You\"?",
    requirement: "Can you play the music \"Shape of You\"?",
    task: "User: Can you play the music \"Shape of You\"?\nAI: Sure, I can play \"Shape of You\".",
    toolNames: ["PlayMusic"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "PlayMusic", args: {"music_name":"Shape of You"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/346",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you tell me my balance?",
    requirement: "Can you tell me my balance?",
    task: "User: Can you tell me my balance?\nAI: Sure, I can help you check your balance. To do this, I just need to verify your identity. Can you please confirm your username and password?\nUser: My username is JohnDoe and my password is pass123.\nAI: Thank you. Let me check your identity now.",
    toolNames: ["QueryBalance", "GetUserToken"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "GetUserToken", args: {"username":"JohnDoe","password":"pass123"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/347",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you tell me my balance?",
    requirement: "Can you tell me my balance?",
    task: "User: Can you tell me my balance?\nAI: Sure, I can help you check your balance. To do this, I just need to verify your identity. Can you please confirm your username and password?\nUser: My username is JohnDoe and my password is pass123.\nAI: Thank you. Let me check your identity now.\nAI: Great news! Your identity has been confirmed. Now, let me check your balance.",
    toolNames: ["QueryBalance", "GetUserToken"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "QueryBalance", args: {"token":"a9s8d7f6g5h4j3k2l1"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/348",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me modify a reminder?",
    requirement: "Can you help me modify a reminder?",
    task: "User: Can you help me modify a reminder?\nAI: Of course, what do you want to change in the reminder?\nUser: I want to change the description to \"Submit report\" and the time to \"2023-03-17 09:00:00\".\nAI: Alright, I need your token to access your reminders. Can you please provide your username and password?\nUser: My username is testuser and password is testpass.",
    toolNames: ["DeleteAgenda", "ModifyReminder", "GetUserToken", "AddAgenda"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "GetUserToken", args: {"username":"testuser","password":"testpass"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/349",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me modify a reminder?",
    requirement: "Can you help me modify a reminder?",
    task: "User: Can you help me modify a reminder?\nAI: Of course, what do you want to change in the reminder?\nUser: I want to change the description to \"Submit report\" and the time to \"2023-03-17 09:00:00\".\nAI: Alright, I need your token to access your reminders. Can you please provide your username and password?\nUser: My username is testuser and password is testpass.\nAI: Thank you. Now, to modify your reminder, the API needs the token, the new content and the new time. Please confirm if the new content should be \"Submit report\" and the new time should be \"2023-03-17 09:00:00\"?\nUser: Yes, that's correct.",
    toolNames: ["DeleteAgenda", "ModifyReminder", "GetUserToken", "AddAgenda"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "ModifyReminder", args: {"token":"p9o8i7u6y5t4k3e2w1q","content":"Submit report","time":"2023-03-17 09:00:00"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/350",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me modify a reminder?",
    requirement: "Can you help me modify a reminder?",
    task: "User: Can you help me modify a reminder?\nAI: Of course, what do you want to change in the reminder?\nUser: I want to change the description to \"Submit report\" and the time to \"2023-03-17 09:00:00\".\nAI: Alright, I need your token to access your reminders. Can you please provide your username and password?\nUser: My username is testuser and password is testpass.\nAI: Thank you. Now, to modify your reminder, the API needs the token, the new content and the new time. Please confirm if the new content should be \"Submit report\" and the new time should be \"2023-03-17 09:00:00\"?\nUser: Yes, that's correct.\nAI: Your reminder has been modified. Is there anything else you need help with?\nUser: Yes, can you help me add an agenda?\nAI: Sure, what information do you want to add for the agenda?\nUser: I want to add \"Dinner with friends\" at \"Cheesecake Factory\" on \"2023-03-20\".\nAI: To add a new agenda, I need your token. Can you please provide your username and password?\nUser: My username is testuser and password is testpass.",
    toolNames: ["DeleteAgenda", "ModifyReminder", "GetUserToken", "AddAgenda"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "GetUserToken", args: {"username":"testuser","password":"testpass"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/351",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me modify a reminder?",
    requirement: "Can you help me modify a reminder?",
    task: "User: Can you help me modify a reminder?\nAI: Of course, what do you want to change in the reminder?\nUser: I want to change the description to \"Submit report\" and the time to \"2023-03-17 09:00:00\".\nAI: Alright, I need your token to access your reminders. Can you please provide your username and password?\nUser: My username is testuser and password is testpass.\nAI: Thank you. Now, to modify your reminder, the API needs the token, the new content and the new time. Please confirm if the new content should be \"Submit report\" and the new time should be \"2023-03-17 09:00:00\"?\nUser: Yes, that's correct.\nAI: Your reminder has been modified. Is there anything else you need help with?\nUser: Yes, can you help me add an agenda?\nAI: Sure, what information do you want to add for the agenda?\nUser: I want to add \"Dinner with friends\" at \"Cheesecake Factory\" on \"2023-03-20\".\nAI: To add a new agenda, I need your token. Can you please provide your username and password?\nUser: My username is testuser and password is testpass.\nAI: Thank you. To add the agenda, the API needs the token, the content, the time and the location. Please confirm if the content is \"Dinner with friends\", the time is \"2023-03-20\" and the location is \"Cheesecake Factory\".\nUser: Yes, those are correct.",
    toolNames: ["DeleteAgenda", "ModifyReminder", "GetUserToken", "AddAgenda"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "AddAgenda", args: {"token":"p9o8i7u6y5t4k3e2w1q","content":"Dinner with friends","time":"2023-03-20 00:00:00","location":"Cheesecake Factory"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/352",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me modify a reminder?",
    requirement: "Can you help me modify a reminder?",
    task: "User: Can you help me modify a reminder?\nAI: Of course, what do you want to change in the reminder?\nUser: I want to change the description to \"Submit report\" and the time to \"2023-03-17 09:00:00\".\nAI: Alright, I need your token to access your reminders. Can you please provide your username and password?\nUser: My username is testuser and password is testpass.\nAI: Thank you. Now, to modify your reminder, the API needs the token, the new content and the new time. Please confirm if the new content should be \"Submit report\" and the new time should be \"2023-03-17 09:00:00\"?\nUser: Yes, that's correct.\nAI: Your reminder has been modified. Is there anything else you need help with?\nUser: Yes, can you help me add an agenda?\nAI: Sure, what information do you want to add for the agenda?\nUser: I want to add \"Dinner with friends\" at \"Cheesecake Factory\" on \"2023-03-20\".\nAI: To add a new agenda, I need your token. Can you please provide your username and password?\nUser: My username is testuser and password is testpass.\nAI: Thank you. To add the agenda, the API needs the token, the content, the time and the location. Please confirm if the content is \"Dinner with friends\", the time is \"2023-03-20\" and the location is \"Cheesecake Factory\".\nUser: Yes, those are correct.\nAI: Your agenda has been added successfully. Is there anything else you need help with?\nUser: Can you also help me delete the same agenda?\nAI: Sure, to delete the agenda, the API needs the token, the content, the time and the location. Please confirm if the content is \"Dinner with friends\", the time is \"2023-03-20\" and the location is \"Cheesecake Factory\".\nUser: Yes, it is.",
    toolNames: ["DeleteAgenda", "ModifyReminder", "GetUserToken", "AddAgenda"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "DeleteAgenda", args: {"token":"p9o8i7u6y5t4k3e2w1q","content":"Dinner with friends","time":"2023-03-20 00:00:00","location":"Cheesecake Factory"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/353",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me modify a meeting reservation?",
    requirement: "Can you help me modify a meeting reservation?",
    task: "User: Can you help me modify a meeting reservation?\nAI: Sure. What details do you want to modify?\nUser: I need to change the start time to 2023-03-27 9:00 and add a few more attendees to my existing reservation.\nAI: Okay. To make changes to your reservation, I need your token. Let me authenticate you with our system. Please provide me with your username and password.\nUser: My username is newuser and my password is newpass.",
    toolNames: ["ModifyMeeting", "GetUserToken"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "GetUserToken", args: {"username":"newuser","password":"newpass"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/354",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me modify a meeting reservation?",
    requirement: "Can you help me modify a meeting reservation?",
    task: "User: Can you help me modify a meeting reservation?\nAI: Sure. What details do you want to modify?\nUser: I need to change the start time to 2023-03-27 9:00 and add a few more attendees to my existing reservation.\nAI: Okay. To make changes to your reservation, I need your token. Let me authenticate you with our system. Please provide me with your username and password.\nUser: My username is newuser and my password is newpass.\nAI: Your token has been authenticated. What is the topic of your meeting, and where is it located?\nUser: The topic is New Employee Orientation, and it will be held in the Training Room.\nAI: And who will be attending the meeting?\nUser: The current attendees are David Wang and Amy Chen. I want to add Erica Liu to the list.",
    toolNames: ["ModifyMeeting", "GetUserToken"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "ModifyMeeting", args: {"token":"l9k8j7h6g5f4d3s2a1","meeting_topic":"New Employee Orientation","start_time":"2023-03-27 09:00:00","end_time":"2023-03-27 11:00:00","location":"Training Room","attendees":"["} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/355",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me check if there is a reservation for the Design Team M…",
    requirement: "Can you help me check if there is a reservation for the Design Team Meeting on March 26, 2023 from 11:00AM to 1:00PM at Design Studio?",
    task: "User: Can you help me check if there is a reservation for the Design Team Meeting on March 26, 2023 from 11:00AM to 1:00PM at Design Studio?\nAI: Sure, let me check that for you. Do you have a token for authentication?\nUser: No, I don't have it. Could you help me get one?\nAI: Sure, I can help you with that. I will call the GetUserToken API in the background to get the token for you. Please provide me with your username and password.\nUser: My username is user2 and my password is user2pass.",
    toolNames: ["QueryMeeting", "GetUserToken"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "GetUserToken", args: {"username":"user2","password":"user2pass"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/356",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me check if there is a reservation for the Design Team M…",
    requirement: "Can you help me check if there is a reservation for the Design Team Meeting on March 26, 2023 from 11:00AM to 1:00PM at Design Studio?",
    task: "User: Can you help me check if there is a reservation for the Design Team Meeting on March 26, 2023 from 11:00AM to 1:00PM at Design Studio?\nAI: Sure, let me check that for you. Do you have a token for authentication?\nUser: No, I don't have it. Could you help me get one?\nAI: Sure, I can help you with that. I will call the GetUserToken API in the background to get the token for you. Please provide me with your username and password.\nUser: My username is user2 and my password is user2pass.\nAI: Authenticated. Now, I will call the QueryMeeting API to check if the reservation for the Design Team Meeting on March 26, 2023 from 11:00AM to 1:00PM at Design Studio exists. The attendances are Lucas Wang and Michelle Chen.",
    toolNames: ["QueryMeeting", "GetUserToken"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "QueryMeeting", args: {"token":"o9i8u7y6t5r4e3w2q1","meeting_topic":"Design Team Meeting","start_time":"2023-03-26 11:00:00","end_time":"2023-03-26 13:00:00","location":"Design Studio","attendees":"["} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/357",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you turn on my smart light at 7 PM tonight? Today is 2021-12-05.",
    requirement: "Can you turn on my smart light at 7 PM tonight? Today is 2021-12-05.",
    task: "User: Can you turn on my smart light at 7 PM tonight? Today is 2021-12-05.\nAI: Sure, I can help with that. What is the ID of your smart light device?\nUser: The ID is 1234.\nAI: Got it. And just to confirm, you want me to turn on the smart light at 7 PM tonight, correct?\nUser: That's right.",
    toolNames: ["TimedSwitch"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "TimedSwitch", args: {"device_id":"1234","time":"2021-12-05 19:00:00","on":"True"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/358",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me modify my schedule for next week? I need to change th…",
    requirement: "Can you help me modify my schedule for next week? I need to change the time and location of one of my events.",
    task: "User: Can you help me modify my schedule for next week? I need to change the time and location of one of my events.\nAI: Sure, I can help you with that. What is the content of the agenda you want to modify?\nUser: It's \"Pick up dry cleaning\".\nAI: Got it. What is the new time and location for this event?\nUser: The new time is March 23, 2pm and the new location is \"Laundry Time\".\nAI: Alright, I will modify the agenda for you. Let me check your token first. Can you please provide me your username and password?\nUser: My username is \"newuser\" and my password is \"newpass\".",
    toolNames: ["ModifyAgenda", "GetUserToken"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "GetUserToken", args: {"username":"newuser","password":"newpass"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/359",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me modify my schedule for next week? I need to change th…",
    requirement: "Can you help me modify my schedule for next week? I need to change the time and location of one of my events.",
    task: "User: Can you help me modify my schedule for next week? I need to change the time and location of one of my events.\nAI: Sure, I can help you with that. What is the content of the agenda you want to modify?\nUser: It's \"Pick up dry cleaning\".\nAI: Got it. What is the new time and location for this event?\nUser: The new time is March 23, 2pm and the new location is \"Laundry Time\".\nAI: Alright, I will modify the agenda for you. Let me check your token first. Can you please provide me your username and password?\nUser: My username is \"newuser\" and my password is \"newpass\".\nAI: Great, I got your token. Now, let me modify the agenda for you.",
    toolNames: ["ModifyAgenda", "GetUserToken"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "ModifyAgenda", args: {"token":"l9k8j7h6g5f4d3s2a1","content":"Pick up dry cleaning","time":"2023-03-23 14:00:00","location":"Laundry Time"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/360",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you check my appointment on March 25th, 2023 with Dr. Kim?",
    requirement: "Can you check my appointment on March 25th, 2023 with Dr. Kim?",
    task: "User: Can you check my appointment on March 25th, 2023 with Dr. Kim?\nAI: Sure, may I know your name?\nUser: It's Robert Lee.",
    toolNames: ["EmergencyKnowledge", "QueryRegistration"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "QueryRegistration", args: {"patient_name":"Robert Lee","date":"2023-03-25"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/361",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you check my appointment on March 25th, 2023 with Dr. Kim?",
    requirement: "Can you check my appointment on March 25th, 2023 with Dr. Kim?",
    task: "User: Can you check my appointment on March 25th, 2023 with Dr. Kim?\nAI: Sure, may I know your name?\nUser: It's Robert Lee.\nAI: According to our records, you have an appointment on March 25th, 2023 with Dr. Kim.\nUser: I am having shortness of breath, what could be the possible disease?\nAI: I can help you with that. Can you please tell me more about your symptoms?\nUser: I have difficulty breathing and it feels like I am not getting enough air.",
    toolNames: ["EmergencyKnowledge", "QueryRegistration"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "EmergencyKnowledge", args: {"symptom":"shortness of breath"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/362",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me find some information about a headache?",
    requirement: "Can you help me find some information about a headache?",
    task: "User: Can you help me find some information about a headache?\nAI: Sure, I can assist you with that. What specific symptom are you experiencing?\nUser: I have a headache and it's really bothering me.\nAI: Understood. Let me search for some information.",
    toolNames: ["EmergencyKnowledge"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "EmergencyKnowledge", args: {"symptom":"Headache"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/363",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me find out my schedule for tomorrow? Today is 2023-03-1…",
    requirement: "Can you help me find out my schedule for tomorrow? Today is 2023-03-17.",
    task: "User: Can you help me find out my schedule for tomorrow? Today is 2023-03-17.\nAI: Sure, I can help you with that. To access your schedule, I need to authenticate you. Can you please provide me with your email and password?\nUser: Sure, my username is JohnDoe and password is pass123.",
    toolNames: ["QueryAgenda", "GetUserToken"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "GetUserToken", args: {"username":"JohnDoe","password":"pass123"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/364",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me find out my schedule for tomorrow? Today is 2023-03-1…",
    requirement: "Can you help me find out my schedule for tomorrow? Today is 2023-03-17.",
    task: "User: Can you help me find out my schedule for tomorrow? Today is 2023-03-17.\nAI: Sure, I can help you with that. To access your schedule, I need to authenticate you. Can you please provide me with your email and password?\nUser: Sure, my username is JohnDoe and password is pass123.\nAI: Thanks for providing the information. I have generated a token for you. Now, can you please tell me what is the content of the agenda, the time, and the location for tomorrow's schedule?\nUser: My agenda is a meeting with a client. The time is 3 PM, and the location is 123 Main St.",
    toolNames: ["QueryAgenda", "GetUserToken"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "QueryAgenda", args: {"token":"a9s8d7f6g5h4j3k2l1","content":"Meeting with client","time":"2023-03-18 15:00:00","location":"123 Main St"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/365",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you cancel my registration for appointment ID 90123456?",
    requirement: "Can you cancel my registration for appointment ID 90123456?",
    task: "User: Can you cancel my registration for appointment ID 90123456?\nAI: Sure, may I have the patient name, appointment date, and doctor's name for verification?\nUser: Olivia Davis, October 10th, Dr. Smith.",
    toolNames: ["CancelRegistration"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "CancelRegistration", args: {"appointment_id":"90123456"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/366",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you perform some simple calculations for me?",
    requirement: "Can you perform some simple calculations for me?",
    task: "User: Can you perform some simple calculations for me?\nAI: Sure, what calculation do you want me to perform?\nUser: Can you calculate (5+10)*3?\nAI: Sure.",
    toolNames: ["QueryHistoryToday", "Calculator"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "Calculator", args: {"formula":"(5+10)*3"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/367",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you perform some simple calculations for me?",
    requirement: "Can you perform some simple calculations for me?",
    task: "User: Can you perform some simple calculations for me?\nAI: Sure, what calculation do you want me to perform?\nUser: Can you calculate (5+10)*3?\nAI: Sure.\nAI: The result is 45.\nUser: What happened on December 10th in history?\nAI: Would you like me to search for today's history?\nUser: No, I meant December 10, 2023.\nAI: Alright.",
    toolNames: ["QueryHistoryToday", "Calculator"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "QueryHistoryToday", args: {"date":"12-10"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/368",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you modify my alarm for tomorrow morning at 7am? Today is 2023-03…",
    requirement: "Can you modify my alarm for tomorrow morning at 7am? Today is 2023-03-15.",
    task: "User: Can you modify my alarm for tomorrow morning at 7am? Today is 2023-03-15.\nAI: Sure, I can help you with that. What's your username?\nUser: JohnDoe\nAI: Thanks, can you provide me with your password?\nUser: pass123\nAI: Got it. Now let me authenticate you.",
    toolNames: ["ModifyAlarm", "GetUserToken"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "GetUserToken", args: {"username":"JohnDoe","password":"pass123"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/369",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you modify my alarm for tomorrow morning at 7am? Today is 2023-03…",
    requirement: "Can you modify my alarm for tomorrow morning at 7am? Today is 2023-03-15.",
    task: "User: Can you modify my alarm for tomorrow morning at 7am? Today is 2023-03-15.\nAI: Sure, I can help you with that. What's your username?\nUser: JohnDoe\nAI: Thanks, can you provide me with your password?\nUser: pass123\nAI: Got it. Now let me authenticate you.\nAI: Alright, I have your token now. What time would you like to modify your alarm to?\nUser: 7:15am\nAI: And from what time should I modify it?\nUser: 7am\nAI: Got it.",
    toolNames: ["ModifyAlarm", "GetUserToken"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "ModifyAlarm", args: {"token":"a9s8d7f6g5h4j3k2l1","from_time":"2023-03-16 07:00:00","to_time":"2023-03-16 07:15:00"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/370",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you please modify my reminder to submit the proposal at 2 pm on M…",
    requirement: "Can you please modify my reminder to submit the proposal at 2 pm on March 25th?",
    task: "User: Can you please modify my reminder to submit the proposal at 2 pm on March 25th?\nAI: Sure, may I know your username and password?\nUser: My username is user3 and my password is user3pass.",
    toolNames: ["ModifyReminder", "GetUserToken"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "GetUserToken", args: {"username":"user3","password":"user3pass"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/371",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you please modify my reminder to submit the proposal at 2 pm on M…",
    requirement: "Can you please modify my reminder to submit the proposal at 2 pm on March 25th?",
    task: "User: Can you please modify my reminder to submit the proposal at 2 pm on March 25th?\nAI: Sure, may I know your username and password?\nUser: My username is user3 and my password is user3pass.\nAI: Okay, I have retrieved your token. Now, please tell me the new time and content for your reminder.\nUser: The content is \"Submit proposal\" and the time is \"2023-03-25 14:00:00\".",
    toolNames: ["ModifyReminder", "GetUserToken"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "ModifyReminder", args: {"token":"p9o8i7u6y5t4r3e2w1q","content":"Submit proposal","time":"2023-03-25 14:00:00"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/372",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me find some treatments for abdominal pain?",
    requirement: "Can you help me find some treatments for abdominal pain?",
    task: "User: Can you help me find some treatments for abdominal pain?\nAI: Sure, I can help with that. What specific symptom are you experiencing?\nUser: Abdominal pain.\nAI: Got it. Let me search for some treatments.",
    toolNames: ["SymptomSearch"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "SymptomSearch", args: {"symptom":"Abdominal pain"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/373",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me find out my next appointment with Dr. Smith on Octobe…",
    requirement: "Can you help me find out my next appointment with Dr. Smith on October 10th, 2023? My patient ID is 90123456 and my name is Olivia Davis.",
    task: "User: Can you help me find out my next appointment with Dr. Smith on October 10th, 2023? My patient ID is 90123456 and my name is Olivia Davis.\nAI: Sure, let me check that for you.",
    toolNames: ["QueryRegistration"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "QueryRegistration", args: {"patient_name":"Olivia Davis","date":"2023-10-10"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/374",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you translate \"Hello, how are you?\" to French?",
    requirement: "Can you translate \"Hello, how are you?\" to French?",
    task: "User: Can you translate \"Hello, how are you?\" to French?\nAI: Sure, I can do that.",
    toolNames: ["Translate"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "Translate", args: {"src":"Hello, how are you?","tgt_lang":"fr"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/375",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me register an appointment at the hospital?",
    requirement: "Can you help me register an appointment at the hospital?",
    task: "User: Can you help me register an appointment at the hospital?\nAI: Of course, I can do that for you. Please provide me with the patient name, appointment date and doctor name.\nUser: The patient name is John, appointment date is 2022-03-05 and the doctor's name is Dr. Smith.\nAI: Alright, I am processing your request.",
    toolNames: ["AppointmentRegistration"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "AppointmentRegistration", args: {"patient_name":"John","date":"2022-03-05","doctor_name":"Dr. Smith"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/376",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me find the key features of this software?",
    requirement: "Can you help me find the key features of this software?",
    task: "User: Can you help me find the key features of this software?\nAI: Sure, please provide the document url and your question.\nUser: The document url is https://www.example.com/article-4.txt and my question is \"What are the key features of this software?\".",
    toolNames: ["DocumentQA"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "DocumentQA", args: {"url":"https://www.example.com/article-4.txt","question":"What are the key features of this software?"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/377",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me modify a reminder for paying bills on March 20th at 1…",
    requirement: "Can you help me modify a reminder for paying bills on March 20th at 12 PM?",
    task: "User: Can you help me modify a reminder for paying bills on March 20th at 12 PM?\nAI: Sure, I can help you with that. Can you confirm your username and password, please?\nUser: My username is admin and my password is adminpass.",
    toolNames: ["ModifyReminder", "GetUserToken", "AddAgenda"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "GetUserToken", args: {"username":"admin","password":"adminpass"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/378",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me modify a reminder for paying bills on March 20th at 1…",
    requirement: "Can you help me modify a reminder for paying bills on March 20th at 12 PM?",
    task: "User: Can you help me modify a reminder for paying bills on March 20th at 12 PM?\nAI: Sure, I can help you with that. Can you confirm your username and password, please?\nUser: My username is admin and my password is adminpass.\nAI: Thank you. Now, please provide me the new content and time for the reminder.\nUser: The new content is \"Pay utility bills\" and the time is \"2023-03-20 12:00:00\".",
    toolNames: ["ModifyReminder", "GetUserToken", "AddAgenda"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "ModifyReminder", args: {"token":"m9n8b7v6c5x4z3a2s1","content":"Pay utility bills","time":"2023-03-20 12:00:00"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/379",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me modify a reminder for paying bills on March 20th at 1…",
    requirement: "Can you help me modify a reminder for paying bills on March 20th at 12 PM?",
    task: "User: Can you help me modify a reminder for paying bills on March 20th at 12 PM?\nAI: Sure, I can help you with that. Can you confirm your username and password, please?\nUser: My username is admin and my password is adminpass.\nAI: Thank you. Now, please provide me the new content and time for the reminder.\nUser: The new content is \"Pay utility bills\" and the time is \"2023-03-20 12:00:00\".\nAI: Alright, the reminder has been updated successfully.\nUser: Can you also help me add an agenda?\nAI: Sure thing. Please provide me the details for the agenda, namely content, location, and time.\nUser: The agenda is \"Meeting with project team\", location is \"Conference Room A\", and time is \"2023-03-25 10:00:00\".",
    toolNames: ["ModifyReminder", "GetUserToken", "AddAgenda"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "AddAgenda", args: {"token":"m9n8b7v6c5x4z3a2s1","content":"Meeting with project team","location":"Conference Room A","time":"2023-03-25 10:00:00"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/380",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you delete my account?",
    requirement: "Can you delete my account?",
    task: "User: Can you delete my account?\nAI: Sure, I can help you with that. To delete your account, I need your username and password. Do you have that with you?\nUser: Yes, my username is user3 and password is user3pass.\nAI: Thanks for the information. Before I proceed, I need to authenticate your identity. Please give me a moment to authenticate.",
    toolNames: ["DeleteAccount", "GetUserToken"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "GetUserToken", args: {"username":"user3","password":"user3pass"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/381",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you delete my account?",
    requirement: "Can you delete my account?",
    task: "User: Can you delete my account?\nAI: Sure, I can help you with that. To delete your account, I need your username and password. Do you have that with you?\nUser: Yes, my username is user3 and password is user3pass.\nAI: Thanks for the information. Before I proceed, I need to authenticate your identity. Please give me a moment to authenticate.\nAI: Your identity has been authenticated. Now I'll proceed to delete your account.",
    toolNames: ["DeleteAccount", "GetUserToken"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "DeleteAccount", args: {"token":"p9o8i7u6y5t4r3e2w1q"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/382",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me delete an agenda for picking up my dry cleaning on Ma…",
    requirement: "Can you help me delete an agenda for picking up my dry cleaning on March 21st at the cleaners?",
    task: "User: Can you help me delete an agenda for picking up my dry cleaning on March 21st at the cleaners?\nAI: Sure, I can help you with that. To delete the agenda, I need the required information. What is the exact time you want to delete the agenda?\nUser: The time is 10:00 AM.\nAI: Thanks. Just to confirm, you want to delete the agenda for March 21st, 2023 at 10:00 AM at the Cleaners. Is that correct?\nUser: Yes, that's correct.",
    toolNames: ["DeleteAgenda", "GetUserToken"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "GetUserToken", args: {"username":"newuser","password":"newpass"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/383",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me delete an agenda for picking up my dry cleaning on Ma…",
    requirement: "Can you help me delete an agenda for picking up my dry cleaning on March 21st at the cleaners?",
    task: "User: Can you help me delete an agenda for picking up my dry cleaning on March 21st at the cleaners?\nAI: Sure, I can help you with that. To delete the agenda, I need the required information. What is the exact time you want to delete the agenda?\nUser: The time is 10:00 AM.\nAI: Thanks. Just to confirm, you want to delete the agenda for March 21st, 2023 at 10:00 AM at the Cleaners. Is that correct?\nUser: Yes, that's correct.\nAI: Alright, I have authenticated you. Please give me a moment.",
    toolNames: ["DeleteAgenda", "GetUserToken"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "DeleteAgenda", args: {"content":"Pick up dry cleaning","time":"2023-03-21 10:00:00","location":"Cleaners","token":"l9k8j7h6g5f4d3s2a1"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/384",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you please help me translate this text to Spanish?",
    requirement: "Can you please help me translate this text to Spanish?",
    task: "User: Can you please help me translate this text to Spanish?\nAI: Sure, please tell me the text you would like me to translate.\nUser: The quick brown fox jumps over the lazy dog.",
    toolNames: ["Translate"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "Translate", args: {"src":"The quick brown fox jumps over the lazy dog.","tgt_lang":"es"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/385",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me modify a reminder?",
    requirement: "Can you help me modify a reminder?",
    task: "User: Can you help me modify a reminder?\nAI: Sure! What do you want to modify?\nUser: I want to change the content of the reminder to \"Pay bills\" and set the time for March 20th at noon.\nAI: Alright. I need your token for authentication. Can you please give me your username and password?\nUser: My username is \"admin\" and my password is \"adminpass.\"",
    toolNames: ["ModifyReminder", "GetUserToken", "AddAgenda"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "GetUserToken", args: {"username":"admin","password":"adminpass"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/386",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me modify a reminder?",
    requirement: "Can you help me modify a reminder?",
    task: "User: Can you help me modify a reminder?\nAI: Sure! What do you want to modify?\nUser: I want to change the content of the reminder to \"Pay bills\" and set the time for March 20th at noon.\nAI: Alright. I need your token for authentication. Can you please give me your username and password?\nUser: My username is \"admin\" and my password is \"adminpass.\"\nAI: Thank you. Now, please give me the new content and time for the reminder.\nUser: The new content is \"Pay bills.\" The time is March 20th at noon.",
    toolNames: ["ModifyReminder", "GetUserToken", "AddAgenda"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "ModifyReminder", args: {"token":"m9n8b7v6c5x4z3a2s1","content":"Pay bills","time":"2023-03-20 12:00:00"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/387",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me modify a reminder?",
    requirement: "Can you help me modify a reminder?",
    task: "User: Can you help me modify a reminder?\nAI: Sure! What do you want to modify?\nUser: I want to change the content of the reminder to \"Pay bills\" and set the time for March 20th at noon.\nAI: Alright. I need your token for authentication. Can you please give me your username and password?\nUser: My username is \"admin\" and my password is \"adminpass.\"\nAI: Thank you. Now, please give me the new content and time for the reminder.\nUser: The new content is \"Pay bills.\" The time is March 20th at noon.\nAI: Okay, the reminder has been modified. Is there anything else I can help you with?\nUser: Can you also help me add an agenda to my calendar for the same time and location?\nAI: Sure thing. What is the location for the new agenda item?\nUser: The agenda item is at my house.",
    toolNames: ["ModifyReminder", "GetUserToken", "AddAgenda"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "AddAgenda", args: {"token":"m9n8b7v6c5x4z3a2s1","content":"Pay bills","time":"2023-03-20 12:00:00","location":"my house"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/388",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you answer a question about a document for me?",
    requirement: "Can you answer a question about a document for me?",
    task: "User: Can you answer a question about a document for me?\nAI: Sure, what's the document URL and your question?\nUser: The URL is https://www.example.com/article-4.txt and my question is \"What are the key features of this software?\"",
    toolNames: ["DocumentQA"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "DocumentQA", args: {"url":"https://www.example.com/article-4.txt","question":"What are the key features of this software?"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/389",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you answer a question about a document for me?",
    requirement: "Can you answer a question about a document for me?",
    task: "User: Can you answer a question about a document for me?\nAI: Sure, what's the document URL and your question?\nUser: The URL is https://www.example.com/article-4.txt and my question is \"What are the key features of this software?\"\nAI: According to the document, \"Key features of this software include a user-friendly interface and powerful analytics tools.\" Is there anything else you want to know about the document?\nUser: Yes, can you tell me what platforms the software is compatible with?",
    toolNames: ["DocumentQA"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "DocumentQA", args: {"url":"https://www.example.com/article-4.txt","question":"What platforms is this software compatible with?"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/390",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you answer a question about a document for me?",
    requirement: "Can you answer a question about a document for me?",
    task: "User: Can you answer a question about a document for me?\nAI: Sure, what's the document URL and your question?\nUser: The URL is https://www.example.com/article-4.txt and my question is \"What are the key features of this software?\"\nAI: According to the document, \"Key features of this software include a user-friendly interface and powerful analytics tools.\" Is there anything else you want to know about the document?\nUser: Yes, can you tell me what platforms the software is compatible with?\nAI: The software is compatible with Windows, Mac, and Linux operating systems, according to the document. Anything else you need help with?\nUser: Yes, can you tell me about the customer support for the software?",
    toolNames: ["DocumentQA"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "DocumentQA", args: {"url":"https://www.example.com/article-4.txt","question":"What is the customer support like for this software?"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/391",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you cancel my appointment with Dr. Davis on April 10th?",
    requirement: "Can you cancel my appointment with Dr. Davis on April 10th?",
    task: "User: Can you cancel my appointment with Dr. Davis on April 10th?\nAI: Sure, please provide me the appointment ID.\nUser: 56789012",
    toolNames: ["RecordHealthData", "CancelRegistration"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "CancelRegistration", args: {"appointment_id":"56789012"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/392",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you cancel my appointment with Dr. Davis on April 10th?",
    requirement: "Can you cancel my appointment with Dr. Davis on April 10th?",
    task: "User: Can you cancel my appointment with Dr. Davis on April 10th?\nAI: Sure, please provide me the appointment ID.\nUser: 56789012\nAI: Your appointment has been cancelled. Anything else I can help you with?\nUser: Yes, I want to record my health data.\nAI: Okay, please provide your user ID, time and health data.\nUser: My user ID is 123456, time is 2023-04-11 10:30:00 and my health data is [{'name': 'blood_pressure', 'value': '120/80'}, {'name': 'heart_rate', 'value': '80'}]",
    toolNames: ["RecordHealthData", "CancelRegistration"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "RecordHealthData", args: {"user_id":"123456","time":"2023-04-11 10:30:00","health_data":"[{"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/393",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you help me book a hotel room?",
    requirement: "Can you help me book a hotel room?",
    task: "User: Can you help me book a hotel room?\nAI: Sure, I can help you with that. What's the name of the hotel you're interested in?\nUser: The Hilton.\nAI: Great, what date are you checking in and checking out?\nUser: I'll be checking in on June 1st and checking out on June 10th.\nAI: How many rooms do you need and how many adults and children will be staying?\nUser: I need two rooms for four adults and two children.\nAI: Alright, let me check if there are rooms available at the Hilton for those dates.",
    toolNames: ["BookHotel"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "BookHotel", args: {"hotel_name":"Hilton","check_in_time":"2023-06-01","check_out_time":"2023-06-10","room_count":"2","adult_count":"4","child_count":"2"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/394",
    level: 1,
    category: "Level 1 - single call",
    title: "I need to cancel an appointment with Dr. Smith for Olivia Davis on Oc…",
    requirement: "I need to cancel an appointment with Dr. Smith for Olivia Davis on October 10th, 2023. The appointment ID is 90123456.",
    task: "User: I need to cancel an appointment with Dr. Smith for Olivia Davis on October 10th, 2023. The appointment ID is 90123456.\nAI: I can help you with that.",
    toolNames: ["CancelRegistration"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "CancelRegistration", args: {"appointment_id":"90123456"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/395",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you record my health data?",
    requirement: "Can you record my health data?",
    task: "User: Can you record my health data?\nAI: Sure! What's your user ID?\nUser: My user ID is 12345.\nAI: What is the date and time for the health data?\nUser: It is today, at 10:30 am. Today is 2021-09-17.\nAI: Great. What health data would you like to record?\nUser: Blood pressure is 120/80 and heart rate is 75.\nAI: Got it.",
    toolNames: ["RecordHealthData"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "RecordHealthData", args: {"user_id":"12345","time":"2021-09-17 10:30:00","health_data":"[{"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/396",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you tell me my appointment details on June 15th, 2023 as Alice Ch…",
    requirement: "Can you tell me my appointment details on June 15th, 2023 as Alice Chen?",
    task: "User: Can you tell me my appointment details on June 15th, 2023 as Alice Chen?\nAI: Sure. Let me check that for you.",
    toolNames: ["SymptomSearch", "RecordHealthData", "QueryRegistration"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "QueryRegistration", args: {"patient_name":"Alice Chen","date":"2023-06-15"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/397",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you tell me my appointment details on June 15th, 2023 as Alice Ch…",
    requirement: "Can you tell me my appointment details on June 15th, 2023 as Alice Chen?",
    task: "User: Can you tell me my appointment details on June 15th, 2023 as Alice Chen?\nAI: Sure. Let me check that for you.\nAI: According to our records, your appointment ID is 45678901 with Dr. Wang on June 15th, 2023.\nUser: I'm feeling a bit nauseous, can you suggest some possible illnesses?\nAI: Of course. Let me see what I can find.",
    toolNames: ["SymptomSearch", "RecordHealthData", "QueryRegistration"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "SymptomSearch", args: {"symptom":"nausea"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L1/398",
    level: 1,
    category: "Level 1 - single call",
    title: "Can you tell me my appointment details on June 15th, 2023 as Alice Ch…",
    requirement: "Can you tell me my appointment details on June 15th, 2023 as Alice Chen?",
    task: "User: Can you tell me my appointment details on June 15th, 2023 as Alice Chen?\nAI: Sure. Let me check that for you.\nAI: According to our records, your appointment ID is 45678901 with Dr. Wang on June 15th, 2023.\nUser: I'm feeling a bit nauseous, can you suggest some possible illnesses?\nAI: Of course. Let me see what I can find.\nAI: Based on your symptoms, it's possible that you have either Gastroenteritis or Migraine. Would you like to know more about them?\nUser: Can you tell me more about Gastroenteritis?\nAI: Sure. Gastroenteritis is an infection or inflammation of the digestive tract that can cause nausea, vomiting, diarrhea, and other symptoms. Treatment may involve rest, fluids, and medications to manage symptoms and prevent dehydration.\nUser: Thanks. Can you also record my health data from yesterday?\nAI: Sure. What kind of health data do you want to record?\nUser: My blood pressure was 130/80 and my heart rate was 90. The user id is 12345.\nAI: Got it. Let me record that for you.",
    toolNames: ["SymptomSearch", "RecordHealthData", "QueryRegistration"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "RecordHealthData", args: {"user_id":"12345","time":"2023-06-14 13:30:00","health_data":"[{"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L2/0",
    level: 2,
    category: "Level 2 - retrieve then call",
    title: "Can you help me add an agenda to my schedule for July 15th at 2pm wit…",
    requirement: "Can you help me add an agenda to my schedule for July 15th at 2pm with the title \"Meeting with Client A\" at their office?",
    task: "User: Can you help me add an agenda to my schedule for July 15th at 2pm with the title \"Meeting with Client A\" at their office?\nAI: Sure, let me search for the relevant tool.\nAI: Okay. Now I can help you. To proceed, I need your token for authentication. Can you please provide me with your username, password and email?\nUser: My username is newuser, password is newpass, and email is newuser@example.com.\nAI: Thank you. Let me get your token first.\nAI: Okay, I got your token.",
    toolNames: ["ToolSearcher", "GetUserToken", "AddAgenda"],
    requiresRetrieval: true,
    expectedCalls: [
      { name: "ToolSearcher", args: {"keywords":"add schedule"} },
      { name: "GetUserToken", args: {"username":"newuser","password":"newpass"} },
      { name: "AddAgenda", args: {"token":"l9k8j7h6g5f4d3s2a1","content":"Meeting with Client A","time":"2023-07-15 14:00:00","location":"Client"} },
    ],
    mockOutputs: [
      { name: "ToolSearcher", args: {"keywords":"add schedule"}, output: [{"name":"GetUserToken","description":"Get the user token.","input_parameters":{"username":{"type":"str","description":"The username of the user."},"password":{"type":"str","description":"The password of the user."}},"output_parameters":{"token":{"type":"str","description":"The token of the user."}},"desc_for_search":"get user tokenGet the user token."},{"name":"AddAgenda","description":"The API for adding a schedule item includes parameters for token, content, time, and location.","input_parameters":{"token":{"type":"str","description":"User's token."},"content":{"type":"str","description":"The content of the agenda."},"time":{"type":"str","description":"The time for agenda. Format: %Y-%m-%d %H:%M:%S"},"location":{"type":"str","description":"The location of the agenda."}},"output_parameters":{"status":{"type":"str","description":"success or failed"}}}] },
      { name: "GetUserToken", args: {"username":"newuser","password":"newpass"}, output: {"token":"l9k8j7h6g5f4d3s2a1"} },
    ]
  },
  {
    id: "L2/1",
    level: 2,
    category: "Level 2 - retrieve then call",
    title: "Can you help me add a meeting to my agenda for July 15th at 3pm in th…",
    requirement: "Can you help me add a meeting to my agenda for July 15th at 3pm in the conference room?",
    task: "User: Can you help me add a meeting to my agenda for July 15th at 3pm in the conference room?\nAI: Sure, let me search for the relevant tool.\nAI: To add your meeting, I need your authentication token. Can you please provide me with your username and password?\nUser: My username is newuser and my password is newpass.\nAI: Thanks for providing the information. Let me authenticate you.\nAI: Your authentication was successful. Now, let me add your meeting to your agenda.",
    toolNames: ["ToolSearcher", "GetUserToken", "AddAgenda"],
    requiresRetrieval: true,
    expectedCalls: [
      { name: "ToolSearcher", args: {"keywords":"agenda meeting scheduler"} },
      { name: "GetUserToken", args: {"username":"newuser","password":"newpass"} },
      { name: "AddAgenda", args: {"token":"l9k8j7h6g5f4d3s2a1","content":"Meeting in conference room","time":"2023-07-15 15:00:00","location":"conference room"} },
    ],
    mockOutputs: [
      { name: "ToolSearcher", args: {"keywords":"agenda meeting scheduler"}, output: [{"name":"GetUserToken","description":"Get the user token.","input_parameters":{"username":{"type":"str","description":"The username of the user."},"password":{"type":"str","description":"The password of the user."}},"output_parameters":{"token":{"type":"str","description":"The token of the user."}},"desc_for_search":"get user tokenGet the user token."},{"name":"AddAgenda","description":"The API for adding a schedule item includes parameters for token, content, time, and location.","input_parameters":{"token":{"type":"str","description":"User's token."},"content":{"type":"str","description":"The content of the agenda."},"time":{"type":"str","description":"The time for agenda. Format: %Y-%m-%d %H:%M:%S"},"location":{"type":"str","description":"The location of the agenda."}},"output_parameters":{"status":{"type":"str","description":"success or failed"}}}] },
      { name: "GetUserToken", args: {"username":"newuser","password":"newpass"}, output: {"token":"l9k8j7h6g5f4d3s2a1"} },
    ]
  },
  {
    id: "L2/2",
    level: 2,
    category: "Level 2 - retrieve then call",
    title: "Can you help me set an alarm for 9:00 am on 7-15?",
    requirement: "Can you help me set an alarm for 9:00 am on 7-15?",
    task: "User: Can you help me set an alarm for 9:00 am on 7-15?\nAI: Sure. Let me search for the appropriate tool first.\nAI: Completed. I'll need to authenticate. Shall I go ahead and retrieve your token with your account information?\nUser: Yes please. My username is user4 and my password is user4pass.\nAI: I was able to retrieve your token. Now, set the alarm for 9:00 am on 7-15.",
    toolNames: ["ToolSearcher", "GetUserToken", "AddAlarm"],
    requiresRetrieval: true,
    expectedCalls: [
      { name: "ToolSearcher", args: {"keywords":"alarm"} },
      { name: "GetUserToken", args: {"username":"user4","password":"user4pass"} },
      { name: "AddAlarm", args: {"token":"q9w8e7r6t5y4u3i2o1","time":"2023-07-15 09:00:00"} },
    ],
    mockOutputs: [
      { name: "ToolSearcher", args: {"keywords":"alarm"}, output: [{"name":"GetUserToken","description":"Get the user token.","input_parameters":{"username":{"type":"str","description":"The username of the user."},"password":{"type":"str","description":"The password of the user."}},"output_parameters":{"token":{"type":"str","description":"The token of the user."}},"desc_for_search":"get user tokenGet the user token."},{"name":"AddAlarm","description":"The API for setting an alarm includes a parameter for the time.","input_parameters":{"token":{"type":"str","description":"User's token."},"time":{"type":"str","description":"The time for alarm. Format: %Y-%m-%d %H:%M:%S"}},"output_parameters":{"status":{"type":"str","description":"success or failed"}}}] },
      { name: "GetUserToken", args: {"username":"user4","password":"user4pass"}, output: {"token":"q9w8e7r6t5y4u3i2o1"} },
    ]
  },
  {
    id: "L2/3",
    level: 2,
    category: "Level 2 - retrieve then call",
    title: "Can you set an alarm for January 7th, 2023 at 8am?",
    requirement: "Can you set an alarm for January 7th, 2023 at 8am?",
    task: "User: Can you set an alarm for January 7th, 2023 at 8am?\nAI: Sure, I can help with that. First, let me check if I have the alarm setting tool.\nAI: Yes, we have it. Since this is a secure operation, I need to authenticate you first. Can you please provide your username and password?\nUser: My username is user4 and my password is user4pass.\nAI: Thank you, using this information I was able to get your token.\nAI: Now let me set the alarm for you.",
    toolNames: ["ToolSearcher", "GetUserToken", "AddAlarm"],
    requiresRetrieval: true,
    expectedCalls: [
      { name: "ToolSearcher", args: {"keywords":"set alarm"} },
      { name: "GetUserToken", args: {"username":"user4","password":"user4pass"} },
      { name: "AddAlarm", args: {"token":"q9w8e7r6t5y4u3i2o1","time":"2023-01-07 08:00:00"} },
    ],
    mockOutputs: [
      { name: "ToolSearcher", args: {"keywords":"set alarm"}, output: [{"name":"GetUserToken","description":"Get the user token.","input_parameters":{"username":{"type":"str","description":"The username of the user."},"password":{"type":"str","description":"The password of the user."}},"output_parameters":{"token":{"type":"str","description":"The token of the user."}},"desc_for_search":"get user tokenGet the user token."},{"name":"AddAlarm","description":"The API for setting an alarm includes a parameter for the time.","input_parameters":{"token":{"type":"str","description":"User's token."},"time":{"type":"str","description":"The time for alarm. Format: %Y-%m-%d %H:%M:%S"}},"output_parameters":{"status":{"type":"str","description":"success or failed"}}}] },
      { name: "GetUserToken", args: {"username":"user4","password":"user4pass"}, output: {"token":"q9w8e7r6t5y4u3i2o1"} },
    ]
  },
  {
    id: "L2/4",
    level: 2,
    category: "Level 2 - retrieve then call",
    title: "Can you help me book a meeting on March 15th at 3pm for the topic \"Pr…",
    requirement: "Can you help me book a meeting on March 15th at 3pm for the topic \"Project Update\" with John and Jane?",
    task: "User: Can you help me book a meeting on March 15th at 3pm for the topic \"Project Update\" with John and Jane?\nAI: Sure, let me check.\nAI: Okay, I can help you with that. What is the location for the meeting?\nUser: The conference room on the 5th floor.\nAI: Great. Do you have an account with us?\nUser: Yes, my username is JohnDoe and my password is pass123.\nAI: Okay, let me get your token.\nAI: I got your token.",
    toolNames: ["ToolSearcher", "BookHotel", "GetUserToken", "AddMeeting"],
    requiresRetrieval: true,
    expectedCalls: [
      { name: "ToolSearcher", args: {"keywords":"book meeting"} },
      { name: "GetUserToken", args: {"username":"JohnDoe","password":"pass123"} },
      { name: "AddMeeting", args: {"token":"a9s8d7f6g5h4j3k2l1","meeting_topic":"Project Update","start_time":"2023-03-15 15:00:00","end_time":"2023-03-15 16:00:00","location":"conference room on the 5th floor","attendees":"["} },
    ],
    mockOutputs: [
      { name: "ToolSearcher", args: {"keywords":"book meeting"}, output: {"name":"BookHotel","description":"This API orders a hotel room. Two rooms are ordered if the number of adults is greater than 2. Only one order can be made at same time.","input_parameters":{"hotel_name":{"type":"str","description":"The name of the hotel."},"check_in_time":{"type":"str","description":"The time to check in. Format: %Y-%m-%d"},"check_out_time":{"type":"str","description":"The time to check out. Format: %Y-%m-%d"},"room_count":{"type":"int","description":"The number of rooms to order."},"adult_count":{"type":"int","description":"The number of adults."},"child_count":{"type":"int","description":"The number of children."}},"output_parameters":{"order_id":{"type":"str","description":"The ID of the order."}}} },
      { name: "GetUserToken", args: {"username":"JohnDoe","password":"pass123"}, output: {"token":"a9s8d7f6g5h4j3k2l1"} },
    ]
  },
  {
    id: "L2/5",
    level: 2,
    category: "Level 2 - retrieve then call",
    title: "Can you help me schedule a meeting with John for next Monday at 2 pm…",
    requirement: "Can you help me schedule a meeting with John for next Monday at 2 pm in the meeting room?",
    task: "User: Can you help me schedule a meeting with John for next Monday at 2 pm in the meeting room?\nAI: Sure. Let me search for relevant tools first.\nAI: Okay, to schedule a meeting with John for next Monday at 2 pm in the meeting room, I need your authentication. Can you please provide your username and password?\nUser: My username is JohnDoe and my password is pass123.\nAI: Great.\nAI: I've got your token. Now, let me schedule the meeting.",
    toolNames: ["ToolSearcher", "GetUserToken", "QueryAgenda", "AddMeeting"],
    requiresRetrieval: true,
    expectedCalls: [
      { name: "ToolSearcher", args: {"keywords":"schedule meeting"} },
      { name: "GetUserToken", args: {"username":"JohnDoe","password":"pass123"} },
      { name: "AddMeeting", args: {"token":"a9s8d7f6g5h4j3k2l1","meeting_topic":"Meeting with John","start_time":"2023-07-10 14:00:00","end_time":"2023-07-10 15:00:00","location":"meeting room","attendees":"["} },
    ],
    mockOutputs: [
      { name: "ToolSearcher", args: {"keywords":"schedule meeting"}, output: [{"name":"GetUserToken","description":"Get the user token.","input_parameters":{"username":{"type":"str","description":"The username of the user."},"password":{"type":"str","description":"The password of the user."}},"output_parameters":{"token":{"type":"str","description":"The token of the user."}},"desc_for_search":"get user tokenGet the user token."},{"name":"QueryAgenda","description":"The API for getting a schedule item includes parameters for token, content, time, and location.","input_parameters":{"token":{"type":"str","description":"User's token."},"content":{"type":"str","description":"The content of the agenda."},"time":{"type":"str","description":"The time for agenda. Format: %Y-%m-%d %H:%M:%S"},"location":{"type":"str","description":"The location of the agenda."}},"output_parameters":{"info":{"type":"json","description":"agenda info including username and time"}}}] },
      { name: "GetUserToken", args: {"username":"JohnDoe","password":"pass123"}, output: {"token":"a9s8d7f6g5h4j3k2l1"} },
    ]
  },
  {
    id: "L2/6",
    level: 2,
    category: "Level 2 - retrieve then call",
    title: "Can you help me add a reminder for my meeting at 3pm on January 5, 20…",
    requirement: "Can you help me add a reminder for my meeting at 3pm on January 5, 2023 with the topic \"sales report\"?",
    task: "User: Can you help me add a reminder for my meeting at 3pm on January 5, 2023 with the topic \"sales report\"?\nAI: Sure, I can help you with that. First, let me search for the relevant tool.\nAI: Found it! Now, I need your user authentication token. Can you please provide me with your username, password?\nUser: My username is \"newuser\", my password is \"newpass\".\nAI: Thank you. Now I'm going to get your user token.\nAI: Got it! Now let me add the reminder for you.",
    toolNames: ["ToolSearcher", "GetUserToken", "AddReminder"],
    requiresRetrieval: true,
    expectedCalls: [
      { name: "ToolSearcher", args: {"keywords":"add reminder"} },
      { name: "GetUserToken", args: {"username":"newuser","password":"newpass"} },
      { name: "AddReminder", args: {"token":"l9k8j7h6g5f4d3s2a1","content":"sales report","time":"2023-01-05 15:00:00"} },
    ],
    mockOutputs: [
      { name: "ToolSearcher", args: {"keywords":"add reminder"}, output: [{"name":"GetUserToken","description":"Get the user token.","input_parameters":{"username":{"type":"str","description":"The username of the user."},"password":{"type":"str","description":"The password of the user."}},"output_parameters":{"token":{"type":"str","description":"The token of the user."}},"desc_for_search":"get user tokenGet the user token."},{"name":"AddReminder","description":"Add a reminder API that takes three parameters - 'token'，'content' and 'time'. The 'token' parameter refers to the user's token and the 'content' parameter refers to the description of the reminder and the 'time' parameter specifies the time at which the reminder should be triggered.","input_parameters":{"token":{"type":"str","description":"User's token."},"content":{"type":"str","description":"The content of the conference."},"time":{"type":"str","description":"The time for conference. Format: %Y-%m-%d %H:%M:%S"}},"output_parameters":{"status":{"type":"str","description":"success or failed"}}}] },
      { name: "GetUserToken", args: {"username":"newuser","password":"newpass"}, output: {"token":"l9k8j7h6g5f4d3s2a1"} },
    ]
  },
  {
    id: "L2/7",
    level: 2,
    category: "Level 2 - retrieve then call",
    title: "Hello, I need help registering an appointment for next Monday with Dr…",
    requirement: "Hello, I need help registering an appointment for next Monday with Dr. Smith.",
    task: "User: Hello, I need help registering an appointment for next Monday with Dr. Smith.\nAI: Sure, let me check.\nAI: Based on your request, I find the suitable tool. Can you please provide me with the patient name and the specific date you want the appointment to be on?\nUser: Yes, the patient name is John Doe, and the date is 2023-07-10.\nAI: Great, thank you.",
    toolNames: ["ToolSearcher", "AppointmentRegistration"],
    requiresRetrieval: true,
    expectedCalls: [
      { name: "ToolSearcher", args: {"keywords":"hospital appointment registration"} },
      { name: "AppointmentRegistration", args: {"patient_name":"John Doe","date":"2023-07-10","doctor_name":"Dr. Smith"} },
    ],
    mockOutputs: [
      { name: "ToolSearcher", args: {"keywords":"hospital appointment registration"}, output: {"name":"AppointmentRegistration","description":"This API registers an appointment of hospital.","input_parameters":{"patient_name":{"type":"str","description":"The name of patient."},"date":{"type":"str","description":"The date of appointment. Format be like %Y-%m-%d"},"doctor_name":{"type":"str","description":"The name of appointed doctor."}},"output_parameters":{"appointment_id":{"type":"str","description":"The ID of appointment."}}} },
    ]
  },
  {
    id: "L2/8",
    level: 2,
    category: "Level 2 - retrieve then call",
    title: "Can you help me book a hotel room for two adults and one child on Oct…",
    requirement: "Can you help me book a hotel room for two adults and one child on October 5th and check-out on October 7th at Grand Hotel?",
    task: "User: Can you help me book a hotel room for two adults and one child on October 5th and check-out on October 7th at Grand Hotel?\nAI: Sure, let me search for available hotels.\nAI: I have found the tool that can help us book a hotel room.",
    toolNames: ["ToolSearcher", "BookHotel"],
    requiresRetrieval: true,
    expectedCalls: [
      { name: "ToolSearcher", args: {"keywords":"book hotel"} },
      { name: "BookHotel", args: {"hotel_name":"Grand Hotel","check_in_time":"2023-10-05","check_out_time":"2023-10-07","room_count":"1","adult_count":"2","child_count":"1"} },
    ],
    mockOutputs: [
      { name: "ToolSearcher", args: {"keywords":"book hotel"}, output: {"name":"BookHotel","description":"This API orders a hotel room. Two rooms are ordered if the number of adults is greater than 2. Only one order can be made at same time.","input_parameters":{"hotel_name":{"type":"str","description":"The name of the hotel."},"check_in_time":{"type":"str","description":"The time to check in. Format: %Y-%m-%d"},"check_out_time":{"type":"str","description":"The time to check out. Format: %Y-%m-%d"},"room_count":{"type":"int","description":"The number of rooms to order."},"adult_count":{"type":"int","description":"The number of adults."},"child_count":{"type":"int","description":"The number of children."}},"output_parameters":{"order_id":{"type":"str","description":"The ID of the order."}}} },
    ]
  },
  {
    id: "L2/9",
    level: 2,
    category: "Level 2 - retrieve then call",
    title: "Can you help me book a hotel for my family of four for the night of J…",
    requirement: "Can you help me book a hotel for my family of four for the night of July 15th at Hilton?",
    task: "User: Can you help me book a hotel for my family of four for the night of July 15th at Hilton?\nAI: Sure, let me search for available hotels.",
    toolNames: ["ToolSearcher", "BookHotel"],
    requiresRetrieval: true,
    expectedCalls: [
      { name: "ToolSearcher", args: {"keywords":"book hotel Hilton July 15 2023"} },
      { name: "BookHotel", args: {"hotel_name":"Hilton","check_in_time":"2023-07-15","check_out_time":"2023-07-16","room_count":"1","adult_count":"2","child_count":"2"} },
    ],
    mockOutputs: [
      { name: "ToolSearcher", args: {"keywords":"book hotel Hilton July 15 2023"}, output: {"name":"BookHotel","description":"This API orders a hotel room. Two rooms are ordered if the number of adults is greater than 2. Only one order can be made at same time.","input_parameters":{"hotel_name":{"type":"str","description":"The name of the hotel."},"check_in_time":{"type":"str","description":"The time to check in. Format: %Y-%m-%d"},"check_out_time":{"type":"str","description":"The time to check out. Format: %Y-%m-%d"},"room_count":{"type":"int","description":"The number of rooms to order."},"adult_count":{"type":"int","description":"The number of adults."},"child_count":{"type":"int","description":"The number of children."}},"output_parameters":{"order_id":{"type":"str","description":"The ID of the order."}}} },
    ]
  },
  {
    id: "L2/10",
    level: 2,
    category: "Level 2 - retrieve then call",
    title: "Can you help me book a hotel room for 2 adults and 1 child from July…",
    requirement: "Can you help me book a hotel room for 2 adults and 1 child from July 10th to July 15th at Hilton Hotel?",
    task: "User: Can you help me book a hotel room for 2 adults and 1 child from July 10th to July 15th at Hilton Hotel?\nAI: Sure, let me search for available hotels.",
    toolNames: ["ToolSearcher", "BookHotel"],
    requiresRetrieval: true,
    expectedCalls: [
      { name: "ToolSearcher", args: {"keywords":"hotel booking"} },
      { name: "BookHotel", args: {"hotel_name":"Hilton Hotel","check_in_time":"2023-07-10","check_out_time":"2023-07-15","room_count":"1","adult_count":"2","child_count":"1"} },
    ],
    mockOutputs: [
      { name: "ToolSearcher", args: {"keywords":"hotel booking"}, output: {"name":"BookHotel","description":"This API orders a hotel room. Two rooms are ordered if the number of adults is greater than 2. Only one order can be made at same time.","input_parameters":{"hotel_name":{"type":"str","description":"The name of the hotel."},"check_in_time":{"type":"str","description":"The time to check in. Format: %Y-%m-%d"},"check_out_time":{"type":"str","description":"The time to check out. Format: %Y-%m-%d"},"room_count":{"type":"int","description":"The number of rooms to order."},"adult_count":{"type":"int","description":"The number of adults."},"child_count":{"type":"int","description":"The number of children."}},"output_parameters":{"order_id":{"type":"str","description":"The ID of the order."}}} },
    ]
  },
  {
    id: "L2/11",
    level: 2,
    category: "Level 2 - retrieve then call",
    title: "Can you help me calculate 25*3+7/3?",
    requirement: "Can you help me calculate 25*3+7/3?",
    task: "User: Can you help me calculate 25*3+7/3?\nAI: Sure, let me calculate that for you.",
    toolNames: ["ToolSearcher", "Calculator"],
    requiresRetrieval: true,
    expectedCalls: [
      { name: "ToolSearcher", args: {"keywords":"calculate 25*3+7/3"} },
      { name: "Calculator", args: {"formula":"25*3+7/3"} },
    ],
    mockOutputs: [
      { name: "ToolSearcher", args: {"keywords":"calculate 25*3+7/3"}, output: {"name":"Calculator","description":"This API provides basic arithmetic operations: addition, subtraction, multiplication, and division.","input_parameters":{"formula":{"type":"str","description":"The formula that needs to be calculated. Only integers are supported. Valid operators are +, -, *, /, and (, ). For example, '(1 + 2) * 3'."}},"output_parameters":{"result":{"type":"float","description":"The result of the formula."}}} },
    ]
  },
  {
    id: "L2/12",
    level: 2,
    category: "Level 2 - retrieve then call",
    title: "Can you help me calculate the square of 8?",
    requirement: "Can you help me calculate the square of 8?",
    task: "User: Can you help me calculate the square of 8?",
    toolNames: ["ToolSearcher", "Calculator"],
    requiresRetrieval: true,
    expectedCalls: [
      { name: "ToolSearcher", args: {"keywords":"calculate the square of 8"} },
      { name: "Calculator", args: {"formula":"8*8"} },
    ],
    mockOutputs: [
      { name: "ToolSearcher", args: {"keywords":"calculate the square of 8"}, output: {"name":"Calculator","description":"This API provides basic arithmetic operations: addition, subtraction, multiplication, and division.","input_parameters":{"formula":{"type":"str","description":"The formula that needs to be calculated. Only integers are supported. Valid operators are +, -, *, /, and (, ). For example, '(1 + 2) * 3'."}},"output_parameters":{"result":{"type":"float","description":"The result of the formula."}}} },
    ]
  },
  {
    id: "L2/13",
    level: 2,
    category: "Level 2 - retrieve then call",
    title: "Hi, can you help me delete my account?",
    requirement: "Hi, can you help me delete my account?",
    task: "User: Hi, can you help me delete my account?\nAI: Sure, I can help you with that. Before we proceed, may I know your username and password?\nUser: My username is user2 and password is user2pass.\nAI: Thank you. To delete your account, I need a token to authenticate the request. Let me get the token for you. Please give me a moment.",
    toolNames: ["ToolSearcher", "GetUserToken", "DeleteAccount"],
    requiresRetrieval: true,
    expectedCalls: [
      { name: "ToolSearcher", args: {"keywords":"delete account"} },
      { name: "GetUserToken", args: {"username":"user2","password":"user2pass"} },
      { name: "DeleteAccount", args: {"token":"o9i8u7y6t5r4e3w2q1"} },
    ],
    mockOutputs: [
      { name: "ToolSearcher", args: {"keywords":"delete account"}, output: [{"name":"GetUserToken","description":"Get the user token.","input_parameters":{"username":{"type":"str","description":"The username of the user."},"password":{"type":"str","description":"The password of the user."}},"output_parameters":{"token":{"type":"str","description":"The token of the user."}},"desc_for_search":"get user tokenGet the user token."},{"name":"DeleteAccount","description":"Delete an account.","input_parameters":{"token":{"type":"str","description":"The token of the user."}},"output_parameters":{"status":{"type":"str","description":"success or failed"}}}] },
      { name: "GetUserToken", args: {"username":"user2","password":"user2pass"}, output: {"token":"o9i8u7y6t5r4e3w2q1"} },
    ]
  },
  {
    id: "L2/14",
    level: 2,
    category: "Level 2 - retrieve then call",
    title: "Can you help me delete my account?",
    requirement: "Can you help me delete my account?",
    task: "User: Can you help me delete my account?\nAI: Sure, I can help with that. Before I proceed, may I know your username and password, please?\nUser: My username is user2 and my password is user2pass.\nAI: Thank you. Let me check if I have your token, one moment please.\nAI: Alright, I have your token. Now, let me try to delete your account.",
    toolNames: ["ToolSearcher", "GetUserToken", "DeleteAccount"],
    requiresRetrieval: true,
    expectedCalls: [
      { name: "ToolSearcher", args: {"keywords":"delete account"} },
      { name: "GetUserToken", args: {"username":"user2","password":"user2pass"} },
      { name: "DeleteAccount", args: {"token":"o9i8u7y6t5r4e3w2q1"} },
    ],
    mockOutputs: [
      { name: "ToolSearcher", args: {"keywords":"delete account"}, output: [{"name":"GetUserToken","description":"Get the user token.","input_parameters":{"username":{"type":"str","description":"The username of the user."},"password":{"type":"str","description":"The password of the user."}},"output_parameters":{"token":{"type":"str","description":"The token of the user."}},"desc_for_search":"get user tokenGet the user token."},{"name":"DeleteAccount","description":"Delete an account.","input_parameters":{"token":{"type":"str","description":"The token of the user."}},"output_parameters":{"status":{"type":"str","description":"success or failed"}}}] },
      { name: "GetUserToken", args: {"username":"user2","password":"user2pass"}, output: {"token":"o9i8u7y6t5r4e3w2q1"} },
    ]
  },
  {
    id: "L2/15",
    level: 2,
    category: "Level 2 - retrieve then call",
    title: "Can you help me delete my account?",
    requirement: "Can you help me delete my account?",
    task: "User: Can you help me delete my account?\nAI: Sure, I'll need your token for authentication. Can you please provide me your username, and password?\nUser: My username is user2, password is user2pass.",
    toolNames: ["ToolSearcher", "GetUserToken", "DeleteAccount"],
    requiresRetrieval: true,
    expectedCalls: [
      { name: "ToolSearcher", args: {"keywords":"delete account"} },
      { name: "GetUserToken", args: {"username":"user2","password":"user2pass"} },
      { name: "DeleteAccount", args: {"token":"o9i8u7y6t5r4e3w2q1"} },
    ],
    mockOutputs: [
      { name: "ToolSearcher", args: {"keywords":"delete account"}, output: [{"name":"GetUserToken","description":"Get the user token.","input_parameters":{"username":{"type":"str","description":"The username of the user."},"password":{"type":"str","description":"The password of the user."}},"output_parameters":{"token":{"type":"str","description":"The token of the user."}},"desc_for_search":"get user tokenGet the user token."},{"name":"DeleteAccount","description":"Delete an account.","input_parameters":{"token":{"type":"str","description":"The token of the user."}},"output_parameters":{"status":{"type":"str","description":"success or failed"}}}] },
      { name: "GetUserToken", args: {"username":"user2","password":"user2pass"}, output: {"token":"o9i8u7y6t5r4e3w2q1"} },
    ]
  },
  {
    id: "L2/16",
    level: 2,
    category: "Level 2 - retrieve then call",
    title: "Hi, can you help me delete an agenda for my meeting with the client o…",
    requirement: "Hi, can you help me delete an agenda for my meeting with the client on March 18 at 2pm at 123 Main St?",
    task: "User: Hi, can you help me delete an agenda for my meeting with the client on March 18 at 2pm at 123 Main St?\nAI: Sure, I can delete a schedule item. For authentication purposes, may I know your username and password?\nUser: My username is JohnDoe and my password is pass123.\nAI: Thank you.\nAI: OK. Can you please provide me the details for the agenda item you want to delete?\nUser: Yes, I want to delete an agenda for my meeting with the client. The content is \"Meeting with client\", the time is \"2023-03-18 14:00:00\", and the location is \"123 Main St\".\nAI: Okay, I got it.",
    toolNames: ["ToolSearcher", "GetUserToken", "DeleteAgenda"],
    requiresRetrieval: true,
    expectedCalls: [
      { name: "ToolSearcher", args: {"keywords":"delete agenda"} },
      { name: "GetUserToken", args: {"username":"JohnDoe","password":"pass123"} },
      { name: "DeleteAgenda", args: {"token":"a9s8d7f6g5h4j3k2l1","content":"Meeting with client","time":"2023-03-18 14:00:00","location":"123 Main St"} },
    ],
    mockOutputs: [
      { name: "ToolSearcher", args: {"keywords":"delete agenda"}, output: [{"name":"GetUserToken","description":"Get the user token.","input_parameters":{"username":{"type":"str","description":"The username of the user."},"password":{"type":"str","description":"The password of the user."}},"output_parameters":{"token":{"type":"str","description":"The token of the user."}},"desc_for_search":"get user tokenGet the user token."},{"name":"DeleteAgenda","description":"The API for deleting a schedule item includes parameters for token, content, time, and location.","input_parameters":{"token":{"type":"str","description":"User's token."},"content":{"type":"str","description":"The content of the agenda."},"time":{"type":"str","description":"The time for agenda. Format: %Y-%m-%d %H:%M:%S"},"location":{"type":"str","description":"The location of the agenda."}},"output_parameters":{"status":{"type":"str","description":"success or failed"}}}] },
      { name: "GetUserToken", args: {"username":"JohnDoe","password":"pass123"}, output: {"token":"a9s8d7f6g5h4j3k2l1"} },
    ]
  },
  {
    id: "L2/17",
    level: 2,
    category: "Level 2 - retrieve then call",
    title: "Can you delete my meeting scheduled on March 18th at 2 pm at 123 Main…",
    requirement: "Can you delete my meeting scheduled on March 18th at 2 pm at 123 Main St with client?",
    task: "User: Can you delete my meeting scheduled on March 18th at 2 pm at 123 Main St with client?\nAI: Let me check.\nAI: Based on my search, I can delete your meeting. May I know your account information, please?\nUser: My username is JohnDoe and password is pass123.\nAI: Thank you.\nAI: Okay, I got your token. Now, please provide me with the details of the meeting you want to delete.\nUser: The meeting content was 'Meeting with client', scheduled on March 18th, 2023 at 2 pm at 123 Main St.\nAI: Alright.",
    toolNames: ["ToolSearcher", "GetUserToken", "DeleteAgenda"],
    requiresRetrieval: true,
    expectedCalls: [
      { name: "ToolSearcher", args: {"keywords":"delete agenda March 18th 2 pm 123 Main St client"} },
      { name: "GetUserToken", args: {"username":"JohnDoe","password":"pass123"} },
      { name: "DeleteAgenda", args: {"token":"a9s8d7f6g5h4j3k2l1","content":"Meeting with client","time":"2023-03-18 14:00:00","location":"123 Main St"} },
    ],
    mockOutputs: [
      { name: "ToolSearcher", args: {"keywords":"delete agenda March 18th 2 pm 123 Main St client"}, output: [{"name":"GetUserToken","description":"Get the user token.","input_parameters":{"username":{"type":"str","description":"The username of the user."},"password":{"type":"str","description":"The password of the user."}},"output_parameters":{"token":{"type":"str","description":"The token of the user."}},"desc_for_search":"get user tokenGet the user token."},{"name":"DeleteAgenda","description":"The API for deleting a schedule item includes parameters for token, content, time, and location.","input_parameters":{"token":{"type":"str","description":"User's token."},"content":{"type":"str","description":"The content of the agenda."},"time":{"type":"str","description":"The time for agenda. Format: %Y-%m-%d %H:%M:%S"},"location":{"type":"str","description":"The location of the agenda."}},"output_parameters":{"status":{"type":"str","description":"success or failed"}}}] },
      { name: "GetUserToken", args: {"username":"JohnDoe","password":"pass123"}, output: {"token":"a9s8d7f6g5h4j3k2l1"} },
    ]
  },
  {
    id: "L2/18",
    level: 2,
    category: "Level 2 - retrieve then call",
    title: "Can you help me delete an alarm set for March 20th at 6:30 am?",
    requirement: "Can you help me delete an alarm set for March 20th at 6:30 am?",
    task: "User: Can you help me delete an alarm set for March 20th at 6:30 am?\nAI: Sure, let me check.\nAI: It looks like I can remove the alarm. May I have your username and password to fetch the token for authentication?\nUser: My username is JaneSmith and my password is password.\nAI: Thank you.\nAI: I have fetched the token. Now, may I have the exact time of the alarm you want to remove?\nUser: The time is March 20th at 6:30 am.\nAI: Got it.",
    toolNames: ["ToolSearcher", "GetUserToken", "DeleteAlarm"],
    requiresRetrieval: true,
    expectedCalls: [
      { name: "ToolSearcher", args: {"keywords":"delete alarm"} },
      { name: "GetUserToken", args: {"username":"JaneSmith","password":"password"} },
      { name: "DeleteAlarm", args: {"token":"o8i7u6y5t4r3e2w1q0","time":"2023-03-20 06:30:00"} },
    ],
    mockOutputs: [
      { name: "ToolSearcher", args: {"keywords":"delete alarm"}, output: [{"name":"GetUserToken","description":"Get the user token.","input_parameters":{"username":{"type":"str","description":"The username of the user."},"password":{"type":"str","description":"The password of the user."}},"output_parameters":{"token":{"type":"str","description":"The token of the user."}},"desc_for_search":"get user tokenGet the user token."},{"name":"DeleteAlarm","description":"The API for removing an alarm includes a parameter for the time.","input_parameters":{"token":{"type":"str","description":"User's token."},"time":{"type":"str","description":"The time for alarm. Format: %Y-%m-%d %H:%M:%S"}},"output_parameters":{"status":{"type":"str","description":"success or failed"}}}] },
      { name: "GetUserToken", args: {"username":"JaneSmith","password":"password"}, output: {"token":"o8i7u6y5t4r3e2w1q0"} },
    ]
  },
  {
    id: "L2/19",
    level: 2,
    category: "Level 2 - retrieve then call",
    title: "Can you help me delete my reservation for the Board Meeting on April…",
    requirement: "Can you help me delete my reservation for the Board Meeting on April 5th at 3:00 PM?",
    task: "User: Can you help me delete my reservation for the Board Meeting on April 5th at 3:00 PM?\nAI: Sure, I can assist you with that. Let me check if I can find the API for that.\nAI: I need some information from you like the Meeting Topic, Start Time, End Time, Location, and Attendees.\nUser: The meeting topic is Board Meeting, start time is April 5th 2023 at 3:00 PM, end time is April 5th 2023 at 5:00 PM, location is Boardroom, and attendees are Board Members.\nAI: Thank you. I also need your username and password, please.\nUser: My username is admin and the password is adminpass.\nAI: Before proceeding it, I need to get your token for authentication.\nAI: Alright, I have received the token.",
    toolNames: ["ToolSearcher", "GetUserToken", "DeleteMeeting"],
    requiresRetrieval: true,
    expectedCalls: [
      { name: "ToolSearcher", args: {"keywords":"delete reservation"} },
      { name: "GetUserToken", args: {"username":"admin","password":"adminpass"} },
      { name: "DeleteMeeting", args: {"token":"m9n8b7v6c5x4z3a2s1","meeting_topic":"Board Meeting","start_time":"2023-04-05 15:00:00","end_time":"2023-04-05 17:00:00","location":"Boardroom","attendees":"["} },
    ],
    mockOutputs: [
      { name: "ToolSearcher", args: {"keywords":"delete reservation"}, output: [{"name":"GetUserToken","description":"Get the user token.","input_parameters":{"username":{"type":"str","description":"The username of the user."},"password":{"type":"str","description":"The password of the user."}},"output_parameters":{"token":{"type":"str","description":"The token of the user."}},"desc_for_search":"get user tokenGet the user token."},{"name":"DeleteMeeting","description":"This API allows users to delete a reservation for a meeting and remove the meeting information in the database.Function：Delete user's reservation for a meeting.Exception Handling：1. If the deletion is successful, return a success message.2. If the deletion fails, return a corresponding error message.","input_parameters":{"token":{"type":"str","description":"User's token."},"meeting_topic":{"type":"str","description":"The title of the meeting, no more than 50 characters."},"start_time":{"type":"str","description":"The start time of the meeting, in the pattern of %Y-%m-%d %H:%M:%S"},"end_time":{"type":"str","description":"The end time of the meeting, in the pattern of %Y-%m-%d %H:%M:%S"},"location":{"type":"str","description":"The location where the meeting to be held, no more than 100 characters."},"attendees":{"type":"list(str)","description":"The attendees of the meeting, including names, positions and other information."}},"output_parameters":{"status":{"type":"str","description":"success or failed"}}}] },
      { name: "GetUserToken", args: {"username":"admin","password":"adminpass"}, output: {"token":"m9n8b7v6c5x4z3a2s1"} },
    ]
  },
  {
    id: "L2/20",
    level: 2,
    category: "Level 2 - retrieve then call",
    title: "I need to cancel my reservation for the Board Meeting on April 5th at…",
    requirement: "I need to cancel my reservation for the Board Meeting on April 5th at 3 pm in the Boardroom with Board Members.",
    task: "User: I need to cancel my reservation for the Board Meeting on April 5th at 3 pm in the Boardroom with Board Members.\nAI: Let me check the tools we have first.\nAI: Okay, to cancel your reservation, I’ll need to use the DeleteMeeting API. For authentication, I need to get your user token. What's your username and password?\nUser: My username is admin and password is adminpass.\nAI: Okay.\nAI: Perfect! Now, please give me the details of the meeting you want to cancel, such as the topic, start time, end time, location, and attendees.\nUser: The topic is Board Meeting, the start time is April 5th, 2023 at 3 pm, the end time is April 5th, 2023 at 5 pm, the location is Boardroom, and the attendees are Board Members.",
    toolNames: ["ToolSearcher", "GetUserToken", "ModifyMeeting", "DeleteMeeting"],
    requiresRetrieval: true,
    expectedCalls: [
      { name: "ToolSearcher", args: {"keywords":"meeting cancellation"} },
      { name: "GetUserToken", args: {"username":"admin","password":"adminpass"} },
      { name: "DeleteMeeting", args: {"token":"m9n8b7v6c5x4z3a2s1","meeting_topic":"Board Meeting","start_time":"2023-04-05 15:00:00","end_time":"2023-04-05 17:00:00","location":"Boardroom","attendees":"["} },
    ],
    mockOutputs: [
      { name: "ToolSearcher", args: {"keywords":"meeting cancellation"}, output: [{"name":"GetUserToken","description":"Get the user token.","input_parameters":{"username":{"type":"str","description":"The username of the user."},"password":{"type":"str","description":"The password of the user."}},"output_parameters":{"token":{"type":"str","description":"The token of the user."}},"desc_for_search":"get user tokenGet the user token."},{"name":"ModifyMeeting","description":"This API allows users to modify a reservation for a meetingFunction：Delete user's reservation for a meeting.Exception Handling：1. If the modification is successful, return a success message.2. If the modification fails, return a corresponding error message.","input_parameters":{"token":{"type":"str","description":"User's token."},"meeting_topic":{"type":"str","description":"The title of the meeting, no more than 50 characters."},"start_time":{"type":"str","description":"The start time of the meeting, in the pattern of %Y-%m-%d %H:%M:%S"},"end_time":{"type":"str","description":"The end time of the meeting, in the pattern of %Y-%m-%d %H:%M:%S"},"location":{"type":"str","description":"The location where the meeting to be held, no more than 100 characters."},"attendees":{"type":"list(str)","description":"The attendees of the meeting, including names, positions and other information."}},"output_parameters":{"status":{"type":"str","description":"success or failed"}}}] },
      { name: "GetUserToken", args: {"username":"admin","password":"adminpass"}, output: {"token":"m9n8b7v6c5x4z3a2s1"} },
    ]
  },
  {
    id: "L2/21",
    level: 2,
    category: "Level 2 - retrieve then call",
    title: "Hi, can you remind me to pay bills on March 20th at 12 PM?",
    requirement: "Hi, can you remind me to pay bills on March 20th at 12 PM?",
    task: "User: Hi, can you remind me to pay bills on March 20th at 12 PM?\nAI: Sure, let me check for available tools.\nAI: Okay, I found a tool that can help you with that. To set a reminder, I'll need your authentication token. Can you provide me with your username and password?\nUser: My username is admin and my password is adminpass.\nAI: Thank you.\nAI: Alright, I got your token. Now, let me set up your reminder.",
    toolNames: ["ToolSearcher", "GetUserToken", "AddReminder", "DeleteReminder"],
    requiresRetrieval: true,
    expectedCalls: [
      { name: "ToolSearcher", args: {"keywords":"reminder"} },
      { name: "GetUserToken", args: {"username":"admin","password":"adminpass"} },
      { name: "DeleteReminder", args: {"token":"m9n8b7v6c5x4z3a2s1","content":"Pay bills","time":"2023-03-20 12:00:00"} },
    ],
    mockOutputs: [
      { name: "ToolSearcher", args: {"keywords":"reminder"}, output: [{"name":"GetUserToken","description":"Get the user token.","input_parameters":{"username":{"type":"str","description":"The username of the user."},"password":{"type":"str","description":"The password of the user."}},"output_parameters":{"token":{"type":"str","description":"The token of the user."}},"desc_for_search":"get user tokenGet the user token."},{"name":"AddReminder","description":"Add a reminder API that takes three parameters - 'token'，'content' and 'time'. The 'token' parameter refers to the user's token and the 'content' parameter refers to the description of the reminder and the 'time' parameter specifies the time at which the reminder should be triggered.","input_parameters":{"token":{"type":"str","description":"User's token."},"content":{"type":"str","description":"The content of the conference."},"time":{"type":"str","description":"The time for conference. Format: %Y-%m-%d %H:%M:%S"}},"output_parameters":{"status":{"type":"str","description":"success or failed"}}}] },
      { name: "GetUserToken", args: {"username":"admin","password":"adminpass"}, output: {"token":"m9n8b7v6c5x4z3a2s1"} },
    ]
  },
  {
    id: "L2/22",
    level: 2,
    category: "Level 2 - retrieve then call",
    title: "Hi there, can you help me find some information about my symptoms?",
    requirement: "Hi there, can you help me find some information about my symptoms?",
    task: "User: Hi there, can you help me find some information about my symptoms?\nAI: Of course, what are your symptoms?\nUser: I'm feeling nauseous.\nAI: It looks like your symptoms may be related to gastroenteritis or migraine. Would you like me to provide more information about these conditions?\nUser: Yes, please.",
    toolNames: ["ToolSearcher", "EmergencyKnowledge"],
    requiresRetrieval: true,
    expectedCalls: [
      { name: "ToolSearcher", args: {"keywords":"emergency knowledge"} },
      { name: "EmergencyKnowledge", args: {"symptom":"nausea"} },
    ],
    mockOutputs: [
      { name: "ToolSearcher", args: {"keywords":"emergency knowledge"}, output: {"name":"EmergencyKnowledge","description":"This API searches for a given symptom.","input_parameters":{"symptom":{"type":"str","description":"The symptom to search."}},"output_parameters":{"results":{"type":"list","description":"The list of results. Format be like [{\"name\":possible disease name, \"aid\": first-aid method},...]"}}} },
    ]
  },
  {
    id: "L2/23",
    level: 2,
    category: "Level 2 - retrieve then call",
    title: "Can you tell me the date today?",
    requirement: "Can you tell me the date today?",
    task: "User: Can you tell me the date today?\nAI: Sure. Let me check.\nAI: I have found the GetToday tool.",
    toolNames: ["ToolSearcher", "GetToday"],
    requiresRetrieval: true,
    expectedCalls: [
      { name: "ToolSearcher", args: {"keywords":"current date"} },
      { name: "GetToday", args: {} },
    ],
    mockOutputs: [
      { name: "ToolSearcher", args: {"keywords":"current date"}, output: {"name":"GetToday","description":"This API gets the current date.","input_parameters":{},"output_parameters":{"date":{"type":"str","description":"The current date. Format: %Y-%m-%d"}}} },
    ]
  },
  {
    id: "L2/24",
    level: 2,
    category: "Level 2 - retrieve then call",
    title: "Can you help me modify a schedule item?",
    requirement: "Can you help me modify a schedule item?",
    task: "User: Can you help me modify a schedule item?\nAI: Sure, what would you like to modify about the schedule item?\nUser: I need to change the time and location of my grocery shopping on March 17th.\nAI: Let me search for the relevant tools for modifying a schedule item.\nAI: Alright, I found an API that can help you with that. To modify the schedule item, I need your token. Can you please provide me with your username and password so I can authenticate you?\nUser: My username is \"foo\" and my password is \"bar\".\nAI: Thank you.\nAI: Now, can you give me the details of the modification you would like to make?\nUser: Sure, the content is \"Shopping for groceries\", the time is \"2023-03-17\", and I want to change the location to \"Walmart\".\nAI: Thank you.",
    toolNames: ["ToolSearcher", "GetUserToken", "ModifyAgenda"],
    requiresRetrieval: true,
    expectedCalls: [
      { name: "ToolSearcher", args: {"keywords":"modify schedule item"} },
      { name: "GetUserToken", args: {"username":"foo","password":"bar"} },
      { name: "ModifyAgenda", args: {"token":"z9x8c7v6b5n4m3q2w1","content":"Shopping for groceries","time":"2023-03-17 00:00:00","location":"Walmart"} },
    ],
    mockOutputs: [
      { name: "ToolSearcher", args: {"keywords":"modify schedule item"}, output: [{"name":"GetUserToken","description":"Get the user token.","input_parameters":{"username":{"type":"str","description":"The username of the user."},"password":{"type":"str","description":"The password of the user."}},"output_parameters":{"token":{"type":"str","description":"The token of the user."}},"desc_for_search":"get user tokenGet the user token."},{"name":"ModifyAgenda","description":"The API for modifying a schedule item includes parameters for token, content, time, and location.","input_parameters":{"token":{"type":"str","description":"User's token."},"content":{"type":"str","description":"The content of the agenda."},"time":{"type":"str","description":"The new time for agenda. Format: %Y-%m-%d %H:%M:%S"},"location":{"type":"str","description":"The new location of the agenda."}},"output_parameters":{"status":{"type":"str","description":"success or failed"}}}] },
      { name: "GetUserToken", args: {"username":"foo","password":"bar"}, output: {"token":"z9x8c7v6b5n4m3q2w1"} },
    ]
  },
  {
    id: "L2/25",
    level: 2,
    category: "Level 2 - retrieve then call",
    title: "Can you help me modify my reservation for Product Development Meeting…",
    requirement: "Can you help me modify my reservation for Product Development Meeting on March 29, 2023 at 10:00 AM in the Research and Development Department with attendees Robert Lee, Anna Zhang, and Tony Wang?",
    task: "User: Can you help me modify my reservation for Product Development Meeting on March 29, 2023 at 10:00 AM in the Research and Development Department with attendees Robert Lee, Anna Zhang, and Tony Wang?\nAI: Sure. Let me search for the relevant tool first.\nAI: To modify your reservation, I need your authentication token. Please provide me with your username and password.\nUser: My username is user4 and my password is user4pass.\nAI: Thank you. Now, let me get your token.\nAI: I have received your token. Let me modify your reservation.",
    toolNames: ["ToolSearcher", "GetUserToken", "ModifyMeeting"],
    requiresRetrieval: true,
    expectedCalls: [
      { name: "ToolSearcher", args: {"keywords":"modify reservation for a meeting"} },
      { name: "GetUserToken", args: {"username":"user4","password":"user4pass"} },
      { name: "ModifyMeeting", args: {"token":"q9w8e7r6t5y4u3i2o1","meeting_topic":"Product Development Meeting","start_time":"2023-03-29 10:00:00","end_time":"2023-03-29 12:00:00","location":"Research and Development Department","attendees":"["} },
    ],
    mockOutputs: [
      { name: "ToolSearcher", args: {"keywords":"modify reservation for a meeting"}, output: [{"name":"GetUserToken","description":"Get the user token.","input_parameters":{"username":{"type":"str","description":"The username of the user."},"password":{"type":"str","description":"The password of the user."}},"output_parameters":{"token":{"type":"str","description":"The token of the user."}},"desc_for_search":"get user tokenGet the user token."},{"name":"ModifyMeeting","description":"This API allows users to modify a reservation for a meetingFunction：Delete user's reservation for a meeting.Exception Handling：1. If the modification is successful, return a success message.2. If the modification fails, return a corresponding error message.","input_parameters":{"token":{"type":"str","description":"User's token."},"meeting_topic":{"type":"str","description":"The title of the meeting, no more than 50 characters."},"start_time":{"type":"str","description":"The start time of the meeting, in the pattern of %Y-%m-%d %H:%M:%S"},"end_time":{"type":"str","description":"The end time of the meeting, in the pattern of %Y-%m-%d %H:%M:%S"},"location":{"type":"str","description":"The location where the meeting to be held, no more than 100 characters."},"attendees":{"type":"list(str)","description":"The attendees of the meeting, including names, positions and other information."}},"output_parameters":{"status":{"type":"str","description":"success or failed"}}}] },
      { name: "GetUserToken", args: {"username":"user4","password":"user4pass"}, output: {"token":"q9w8e7r6t5y4u3i2o1"} },
    ]
  },
  {
    id: "L2/26",
    level: 2,
    category: "Level 2 - retrieve then call",
    title: "Can you help me modify my appointment with the details: appointment I…",
    requirement: "Can you help me modify my appointment with the details: appointment ID 34567890, new appointment date March 28th, 2023, and new doctor Dr. Lee?",
    task: "User: Can you help me modify my appointment with the details: appointment ID 34567890, new appointment date March 28th, 2023, and new doctor Dr. Lee?\nAI: Sure, let me check.\nAI: Ok, I can help you with that.",
    toolNames: ["ToolSearcher", "ModifyRegistration"],
    requiresRetrieval: true,
    expectedCalls: [
      { name: "ToolSearcher", args: {"keywords":"modify appointment"} },
      { name: "ModifyRegistration", args: {"appointment_id":"34567890","new_appointment_date":"2023-03-28","new_appointment_doctor":"Dr. Lee"} },
    ],
    mockOutputs: [
      { name: "ToolSearcher", args: {"keywords":"modify appointment"}, output: {"name":"ModifyRegistration","description":"This API modifies the registration of a patient given appointment ID.","input_parameters":{"appointment_id":{"type":"str","description":"The ID of appointment."},"new_appointment_date":{"type":"str","description":"The new appointment date. Format: %Y-%m-%d."},"new_appointment_doctor":{"type":"str","description":"The new appointment doctor."}},"output_parameters":{"status":{"type":"str","description":"The status of modification."}}} },
    ]
  },
  {
    id: "L2/27",
    level: 2,
    category: "Level 2 - retrieve then call",
    title: "Can you help me modify a reminder for tomorrow?",
    requirement: "Can you help me modify a reminder for tomorrow?",
    task: "User: Can you help me modify a reminder for tomorrow?\nAI: Sorry, I am unable to understand the specific date you want me to set the reminder. Could you please tell me the exact date and time?\nUser: Yes, I need to modify a reminder for March 17th at 2 PM to call my mom.\nAI: Sure, let me search for relevant tools first.\nAI: Okay, to modify the reminder, I will need your token. Can you please provide me with your username and password?\nUser: My username is JohnDoe and my password is pass123.\nAI: Thank you.\nAI: I have received your token. Now, please provide me with the content of the reminder and the time you want it to be triggered.\nUser: The content is \"Call mom\" and the time is March 17th, 2023 at 2:30 PM.\nAI: Thank you.",
    toolNames: ["ToolSearcher", "GetUserToken", "ModifyReminder"],
    requiresRetrieval: true,
    expectedCalls: [
      { name: "ToolSearcher", args: {"keywords":"reminder modify"} },
      { name: "GetUserToken", args: {"username":"JohnDoe","password":"pass123"} },
      { name: "ModifyReminder", args: {"token":"a9s8d7f6g5h4j3k2l1","content":"Call mom","time":"2023-03-17 14:30:00"} },
    ],
    mockOutputs: [
      { name: "ToolSearcher", args: {"keywords":"reminder modify"}, output: [{"name":"GetUserToken","description":"Get the user token.","input_parameters":{"username":{"type":"str","description":"The username of the user."},"password":{"type":"str","description":"The password of the user."}},"output_parameters":{"token":{"type":"str","description":"The token of the user."}},"desc_for_search":"get user tokenGet the user token."},{"name":"ModifyReminder","description":"Modify a reminder API that takes three parameters - 'token'，'content' and 'time'. The 'token' parameter refers to the user's token and the 'content' parameter refers to the description of the reminder and the 'time' parameter specifies the time at which the reminder should be triggered.","input_parameters":{"token":{"type":"str","description":"User's token."},"content":{"type":"str","description":"The content of the conference."},"time":{"type":"str","description":"The time for conference. Format: %Y-%m-%d %H:%M:%S"}},"output_parameters":{"status":{"type":"str","description":"success or failed"}}}] },
      { name: "GetUserToken", args: {"username":"JohnDoe","password":"pass123"}, output: {"token":"a9s8d7f6g5h4j3k2l1"} },
    ]
  },
  {
    id: "L2/28",
    level: 2,
    category: "Level 2 - retrieve then call",
    title: "Hmm, I am actually looking for an alarm clock API.",
    requirement: "Hmm, I am actually looking for an alarm clock API.",
    task: "User: Hmm, I am actually looking for an alarm clock API.\nAI: Understood, let me check if we have an API for querying alarm.\nAI: Yes, we do have an API for that. But it requires authentication. Can you please provide me your username and password?\nUser: Sure, my username is user4 and my password is user4pass.\nAI: Thank you. Let me authenticate you.\nAI: Now that I have the token, can you please tell me the time for which you want to query alarm?\nUser: I want to check if I have set any alarms for March 25th, 2023 at 2:10 pm.\nAI: Okay, let me check that for you.",
    toolNames: ["ToolSearcher", "GetUserToken", "QueryAlarm"],
    requiresRetrieval: true,
    expectedCalls: [
      { name: "ToolSearcher", args: {"keywords":"alarm clock"} },
      { name: "GetUserToken", args: {"username":"user4","password":"user4pass"} },
      { name: "QueryAlarm", args: {"token":"q9w8e7r6t5y4u3i2o1","time":"2023-03-25 14:10:00"} },
    ],
    mockOutputs: [
      { name: "ToolSearcher", args: {"keywords":"alarm clock"}, output: [{"name":"GetUserToken","description":"Get the user token.","input_parameters":{"username":{"type":"str","description":"The username of the user."},"password":{"type":"str","description":"The password of the user."}},"output_parameters":{"token":{"type":"str","description":"The token of the user."}},"desc_for_search":"get user tokenGet the user token."},{"name":"QueryAlarm","description":"The API for querying alarm clock, help user to check the alarm clock they have set.","input_parameters":{"token":{"type":"str","description":"User's token."},"time":{"type":"str","description":"The time for alarm. Format: %Y-%m-%d %H:%M:%S"}},"output_parameters":{"info":{"type":"json","description":"alarm info including username, time, content and location"}}}] },
      { name: "GetUserToken", args: {"username":"user4","password":"user4pass"}, output: {"token":"q9w8e7r6t5y4u3i2o1"} },
    ]
  },
  {
    id: "L2/29",
    level: 2,
    category: "Level 2 - retrieve then call",
    title: "Hello, can you help me check my balance?",
    requirement: "Hello, can you help me check my balance?",
    task: "User: Hello, can you help me check my balance?\nAI: Sure, can you please provide me with your username, password and email address?\nUser: My username is foo, password is bar and email is foo@example.com.\nAI: Thank you. Let me authenticate you first.\nAI: Okay, I have received your token. Now I will check your balance.",
    toolNames: ["ToolSearcher", "GetUserToken", "QueryBalance"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "GetUserToken", args: {"username":"foo","password":"bar"} },
      { name: "QueryBalance", args: {"token":"z9x8c7v6b5n4m3q2w1"} },
    ],
    mockOutputs: [
      { name: "GetUserToken", args: {"username":"foo","password":"bar"}, output: {"token":"z9x8c7v6b5n4m3q2w1"} },
    ]
  },
  {
    id: "L2/30",
    level: 2,
    category: "Level 2 - retrieve then call",
    title: "Can you check my account balance?",
    requirement: "Can you check my account balance?",
    task: "User: Can you check my account balance?\nAI: Sure, to access your account balance, I need to authenticate you. Please provide me with your username and password.\nUser: My username is foo and my password is bar.\nAI: Okay, let me authenticate you.\nAI: Now that you are authenticated, let me check your account balance.",
    toolNames: ["ToolSearcher", "GetUserToken", "QueryBalance"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "GetUserToken", args: {"username":"foo","password":"bar"} },
      { name: "QueryBalance", args: {"token":"z9x8c7v6b5n4m3q2w1"} },
    ],
    mockOutputs: [
      { name: "GetUserToken", args: {"username":"foo","password":"bar"}, output: {"token":"z9x8c7v6b5n4m3q2w1"} },
    ]
  },
  {
    id: "L2/31",
    level: 2,
    category: "Level 2 - retrieve then call",
    title: "Hi there! Can you help me check my health data from March 13 to March…",
    requirement: "Hi there! Can you help me check my health data from March 13 to March 20, 2023?",
    task: "User: Hi there! Can you help me check my health data from March 13 to March 20, 2023?\nAI: Of course! To do that, I need to verify your user ID. May I have it please?\nUser: It's F24681.\nAI: Great, thank you. Now let me check.\nAI: To get your health data, I need your user ID, start time, and end time. Can you please provide me with the start and end times for the period you're interested in?\nUser: Sure, it is March 13 at 8am for the start time, and March 14 at 6pm for the end time.\nAI: Got it.",
    toolNames: ["ToolSearcher", "QueryHealthData"],
    requiresRetrieval: true,
    expectedCalls: [
      { name: "ToolSearcher", args: {"keywords":"QueryHealthData"} },
      { name: "QueryHealthData", args: {"user_id":"F24681","start_time":"2023-03-13 08:00:00","end_time":"2023-03-14 18:00:00"} },
    ],
    mockOutputs: [
      { name: "ToolSearcher", args: {"keywords":"QueryHealthData"}, output: {"name":"QueryHealthData","description":"This API queries the recorded health data in database of a given user and time span.","input_parameters":{"user_id":{"type":"str","description":"The user id of the given user. Cases are ignored."},"start_time":{"type":"str","description":"The start time of the time span. Format: %Y-%m-%d %H:%M:%S"},"end_time":{"type":"str","description":"The end time of the time span. Format: %Y-%m-%d %H:%M:%S"}},"output_parameters":{"health_data":{"type":"list","description":"The health data of the given user and time span."}}} },
    ]
  },
  {
    id: "L2/32",
    level: 2,
    category: "Level 2 - retrieve then call",
    title: "Hi, I need to know my history on October 6, 2023.",
    requirement: "Hi, I need to know my history on October 6, 2023.",
    task: "User: Hi, I need to know my history on October 6, 2023.\nAI: Sure, let me check.",
    toolNames: ["ToolSearcher", "QueryHistoryToday"],
    requiresRetrieval: true,
    expectedCalls: [
      { name: "ToolSearcher", args: {"keywords":"history October 6 2023"} },
      { name: "QueryHistoryToday", args: {"date":"10-06"} },
    ],
    mockOutputs: [
      { name: "ToolSearcher", args: {"keywords":"history October 6 2023"}, output: {"name":"QueryHistoryToday","description":"This API queries the history of a given user today.","input_parameters":{"date":{"type":"str","description":"The date of the history. Format: %m-%d"}},"output_parameters":{"history":{"type":"list","description":"The history of the user today."}}} },
    ]
  },
  {
    id: "L2/33",
    level: 2,
    category: "Level 2 - retrieve then call",
    title: "Can you tell me what happened on October 6th in history?",
    requirement: "Can you tell me what happened on October 6th in history?",
    task: "User: Can you tell me what happened on October 6th in history?\nAI: Sure, let me search for relevant tools in the library.",
    toolNames: ["ToolSearcher", "QueryHistoryToday"],
    requiresRetrieval: true,
    expectedCalls: [
      { name: "ToolSearcher", args: {"keywords":"history October 6th"} },
      { name: "QueryHistoryToday", args: {"date":"10-06"} },
    ],
    mockOutputs: [
      { name: "ToolSearcher", args: {"keywords":"history October 6th"}, output: {"name":"QueryHistoryToday","description":"This API queries the history of a given user today.","input_parameters":{"date":{"type":"str","description":"The date of the history. Format: %m-%d"}},"output_parameters":{"history":{"type":"list","description":"The history of the user today."}}} },
    ]
  },
  {
    id: "L2/34",
    level: 2,
    category: "Level 2 - retrieve then call",
    title: "Can you help me check if there's a meeting reservation for Marketing…",
    requirement: "Can you help me check if there's a meeting reservation for Marketing Campaign Planning on March 22nd at 9am in the Marketing Department?",
    task: "User: Can you help me check if there's a meeting reservation for Marketing Campaign Planning on March 22nd at 9am in the Marketing Department?\nAI: Sure! Let me search for relevant tools in the library first.\nAI: The QueryMeeting tool can help us achieve that. But before that, I need your credentials to get the token.\nUser: My username is testuser and password is testpass.\nAI: Great.\nAI: We have successfully authenticated. Now I will check the meeting reservation.",
    toolNames: ["ToolSearcher", "GetUserToken", "AddMeeting", "QueryMeeting"],
    requiresRetrieval: true,
    expectedCalls: [
      { name: "ToolSearcher", args: {"keywords":"meeting reservation query"} },
      { name: "GetUserToken", args: {"username":"testuser","password":"testpass"} },
      { name: "QueryMeeting", args: {"token":"p9o8i7u6y5t4k3e2w1q","meeting_topic":"Marketing Campaign Planning","start_time":"2023-03-22 09:00:00","end_time":"2023-03-22 11:00:00","location":"Marketing Department","attendees":"["} },
    ],
    mockOutputs: [
      { name: "ToolSearcher", args: {"keywords":"meeting reservation query"}, output: [{"name":"GetUserToken","description":"Get the user token.","input_parameters":{"username":{"type":"str","description":"The username of the user."},"password":{"type":"str","description":"The password of the user."}},"output_parameters":{"token":{"type":"str","description":"The token of the user."}},"desc_for_search":"get user tokenGet the user token."},{"name":"AddMeeting","description":"This API allows users to make a reservation for a meeting and store the meeting information in the database.Function：Allow users to make a reservation for a meeting.Exception Handling：1. If the reservation is successful, return a success message.2. If the reservation fails, return a corresponding error message.","input_parameters":{"token":{"type":"str","description":"User's token."},"meeting_topic":{"type":"str","description":"The title of the meeting, no more than 50 characters."},"start_time":{"type":"str","description":"The start time of the meeting, in the pattern of %Y-%m-%d %H:%M:%S"},"end_time":{"type":"str","description":"The end time of the meeting, in the pattern of %Y-%m-%d %H:%M:%S"},"location":{"type":"str","description":"The location where the meeting to be held, no more than 100 characters."},"attendees":{"type":"list(str)","description":"The attendees of the meeting, including names, positions and other information."}},"output_parameters":{"status":{"type":"str","description":"success or failed"}}}] },
      { name: "GetUserToken", args: {"username":"testuser","password":"testpass"}, output: {"token":"p9o8i7u6y5t4k3e2w1q"} },
    ]
  },
  {
    id: "L2/35",
    level: 2,
    category: "Level 2 - retrieve then call",
    title: "Can you help me query the meeting details for the Marketing Campaign…",
    requirement: "Can you help me query the meeting details for the Marketing Campaign Planning on March 22nd 2023 from 9am to 11am held in Marketing Department, with attendees Karen Zhang, Mark Brown, and Timothy Lee?",
    task: "User: Can you help me query the meeting details for the Marketing Campaign Planning on March 22nd 2023 from 9am to 11am held in Marketing Department, with attendees Karen Zhang, Mark Brown, and Timothy Lee?\nAI: Sure.\nAI: I found one. I need your username and password to generate the token for authenticate. What's your username and password?\nUser: My username is testuser and password is testpass.\nAI: Great.\nAI: We have successfully authenticated. Now I will check the meeting reservation.",
    toolNames: ["ToolSearcher", "GetUserToken", "QueryMeeting"],
    requiresRetrieval: true,
    expectedCalls: [
      { name: "ToolSearcher", args: {"keywords":"query meeting"} },
      { name: "GetUserToken", args: {"username":"testuser","password":"testpass"} },
      { name: "QueryMeeting", args: {"token":"p9o8i7u6y5t4k3e2w1q","meeting_topic":"Marketing Campaign Planning","start_time":"2023-03-22 09:00:00","end_time":"2023-03-22 11:00:00","location":"Marketing Department","attendees":"["} },
    ],
    mockOutputs: [
      { name: "ToolSearcher", args: {"keywords":"query meeting"}, output: [{"name":"GetUserToken","description":"Get the user token.","input_parameters":{"username":{"type":"str","description":"The username of the user."},"password":{"type":"str","description":"The password of the user."}},"output_parameters":{"token":{"type":"str","description":"The token of the user."}},"desc_for_search":"get user tokenGet the user token."},{"name":"QueryMeeting","description":"This API allows users to query a reservation for a meeting.Function：Query infomation for a meeting.Exception Handling：1. If the Query is successful, return a meeting infomation with json.2. If the Query fails, return a error message.","input_parameters":{"token":{"type":"str","description":"User's token."},"meeting_topic":{"type":"str","description":"The title of the meeting, no more than 50 characters."},"start_time":{"type":"str","description":"The start time of the meeting, in the pattern of %Y-%m-%d %H:%M:%S"},"end_time":{"type":"str","description":"The end time of the meeting, in the pattern of %Y-%m-%d %H:%M:%S"},"location":{"type":"str","description":"The location where the meeting to be held, no more than 100 characters."},"attendees":{"type":"list(str)","description":"The attendees of the meeting, including names, positions and other information."}},"output_parameters":{"meeting_info":{"type":"json","description":"meeting info"}}}] },
      { name: "GetUserToken", args: {"username":"testuser","password":"testpass"}, output: {"token":"p9o8i7u6y5t4k3e2w1q"} },
    ]
  },
  {
    id: "L2/36",
    level: 2,
    category: "Level 2 - retrieve then call",
    title: "Hi, I need to check the registration of a patient with ID 12345678 fo…",
    requirement: "Hi, I need to check the registration of a patient with ID 12345678 for April 12th, 2023.",
    task: "User: Hi, I need to check the registration of a patient with ID 12345678 for April 12th, 2023.",
    toolNames: ["ToolSearcher", "QueryRegistration"],
    requiresRetrieval: true,
    expectedCalls: [
      { name: "ToolSearcher", args: {"keywords":"registration query patient"} },
      { name: "QueryRegistration", args: {"patient_name":"John Doe","date":"2023-04-12"} },
    ],
    mockOutputs: [
      { name: "ToolSearcher", args: {"keywords":"registration query patient"}, output: {"name":"QueryRegistration","description":"This API queries the registration of a patient given patient ID.","input_parameters":{"patient_name":{"type":"str","description":"The name of patient."},"date":{"type":"str","description":"The date of appointment. Format be like %Y-%m-%d"}},"output_parameters":{"appointments":{"type":"list","description":"The dict where from appointment_id to a list like [\"patient_name\":xxx, \"date\":xxx, \"doctor_name\":xxx]"}}} },
    ]
  },
  {
    id: "L2/37",
    level: 2,
    category: "Level 2 - retrieve then call",
    title: "Can you please check if I have an appointment on April 12th?",
    requirement: "Can you please check if I have an appointment on April 12th?",
    task: "User: Can you please check if I have an appointment on April 12th?\nAI: Sure, may I know your name please?\nUser: John Doe",
    toolNames: ["ToolSearcher", "QueryRegistration"],
    requiresRetrieval: true,
    expectedCalls: [
      { name: "ToolSearcher", args: {"keywords":"Query Registration"} },
      { name: "QueryRegistration", args: {"patient_name":"John Doe","date":"2023-04-12"} },
    ],
    mockOutputs: [
      { name: "ToolSearcher", args: {"keywords":"Query Registration"}, output: {"name":"QueryRegistration","description":"This API queries the registration of a patient given patient ID.","input_parameters":{"patient_name":{"type":"str","description":"The name of patient."},"date":{"type":"str","description":"The date of appointment. Format be like %Y-%m-%d"}},"output_parameters":{"appointments":{"type":"list","description":"The dict where from appointment_id to a list like [\"patient_name\":xxx, \"date\":xxx, \"doctor_name\":xxx]"}}} },
    ]
  },
  {
    id: "L2/38",
    level: 2,
    category: "Level 2 - retrieve then call",
    title: "Can you help me set a reminder to book flight tickets for March 22 at…",
    requirement: "Can you help me set a reminder to book flight tickets for March 22 at 8 am?",
    task: "User: Can you help me set a reminder to book flight tickets for March 22 at 8 am?\nAI: Sure! Let me just search for the relevant tool. [ToolSearcher(keywords='reminder ticket booking')] Based on my search, I can use the QueryReminder API for this. Do you have a token to use for authentication?\nUser: No, I don't have a token.\nAI: Not a problem. I'll just get a token for you using the GetUserToken API. Can you please give me your username and password?\nUser: My username is user2 and my password is user2pass.",
    toolNames: ["ToolSearcher", "GetUserToken"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "GetUserToken", args: {"username":"user2","password":"user2pass"} },
    ],
    mockOutputs: [
    ]
  },
  {
    id: "L2/39",
    level: 2,
    category: "Level 2 - retrieve then call",
    title: "Can you help me set a reminder to book my flight tickets on March 22…",
    requirement: "Can you help me set a reminder to book my flight tickets on March 22 at 8 AM?",
    task: "User: Can you help me set a reminder to book my flight tickets on March 22 at 8 AM?\nAI: Sure, let me check first. [ToolSearcher(keywords='set reminder')]",
    toolNames: ["ToolSearcher", "GetUserToken", "QueryReminder"],
    requiresRetrieval: false,
    expectedCalls: [
      { name: "GetUserToken", args: {"username":"user2","password":"user2pass"} },
      { name: "QueryReminder", args: {"token":"o9i8u7y6t5r4e3w2q1","content":"Book flight tickets","time":"2023-03-22 08:00:00"} },
    ],
    mockOutputs: [
      { name: "GetUserToken", args: {"username":"user2","password":"user2pass"}, output: {"token":"o9i8u7y6t5r4e3w2q1"} },
    ]
  },
  {
    id: "L2/40",
    level: 2,
    category: "Level 2 - retrieve then call",
    title: "Can you please tell me the stock price of Microsoft on 4th February 2…",
    requirement: "Can you please tell me the stock price of Microsoft on 4th February 2022?",
    task: "User: Can you please tell me the stock price of Microsoft on 4th February 2022?\nAI: Sure, let me check.",
    toolNames: ["ToolSearcher", "QueryStock"],
    requiresRetrieval: true,
    expectedCalls: [
      { name: "ToolSearcher", args: {"keywords":"Query Stock"} },
      { name: "QueryStock", args: {"stock_code":"MSFT","date":"2022-02-04"} },
    ],
    mockOutputs: [
      { name: "ToolSearcher", args: {"keywords":"Query Stock"}, output: {"name":"QueryStock","description":"This API queries the stock price of a given stock.","input_parameters":{"stock_code":{"type":"str","description":"The stock code of the given stock."},"date":{"type":"str","description":"The date of the stock price. Format: %Y-%m-%d"}},"output_parameters":{"stock_price":{"type":"float","description":"The stock price of the given stock."}}} },
    ]
  },
  {
    id: "L2/41",
    level: 2,
    category: "Level 2 - retrieve then call",
    title: "Can you help me record my blood pressure and heart rate?",
    requirement: "Can you help me record my blood pressure and heart rate?",
    task: "User: Can you help me record my blood pressure and heart rate?\nAI: Sure, I can help you with that.\nAI: To proceed, please provide me with your user ID and the time of the health data.\nUser: My user ID is ABC123 and the time is 2023-10-18 09:30:00.\nAI: Great, now I need your blood pressure and heart rate readings.\nUser: The blood pressure reading is 140/80 and the heart rate is 70.\nAI: Thanks for the information. Let me record that for you.",
    toolNames: ["ToolSearcher", "RecordHealthData"],
    requiresRetrieval: true,
    expectedCalls: [
      { name: "ToolSearcher", args: {"keywords":"health record"} },
      { name: "RecordHealthData", args: {"user_id":"ABC123","time":"2023-10-18 09:30:00","health_data":"[{"} },
    ],
    mockOutputs: [
      { name: "ToolSearcher", args: {"keywords":"health record"}, output: {"name":"RecordHealthData","description":"This API records the health history of a patient given user ID, time and health data.","input_parameters":{"user_id":{"type":"str","description":"The ID of user."},"time":{"type":"str","description":"The time of health data. Format: %Y-%m-%d %H:%M:%S"},"health_data":{"type":"list","description":"The health data, with the format like [{'name': 'blood_pressure', 'value': '120/80'}, {'name': 'heart_rate', 'value': '80'}]"}},"output_parameters":{"status":{"type":"str","description":"The status of recording."}}} },
    ]
  },
  {
    id: "L2/42",
    level: 2,
    category: "Level 2 - retrieve then call",
    title: "Hi, can you please help me record my blood pressure and heart rate da…",
    requirement: "Hi, can you please help me record my blood pressure and heart rate data for today?",
    task: "User: Hi, can you please help me record my blood pressure and heart rate data for today?\nAI: Sure.\nAI: Alright. I will need your user ID, time, and health data to use this API. Can you please provide me with your user ID and time?\nUser: My user ID is 123ABC and the time is 2023-10-15 09:00:00.\nAI: Thank you. Now, can you please provide me with your blood pressure and heart rate readings?\nUser: My blood pressure is 120/80 and my heart rate is 70 bpm.\nAI: Great. I will now call the RecordHealthData API to record this data for you.",
    toolNames: ["ToolSearcher", "RecordHealthData"],
    requiresRetrieval: true,
    expectedCalls: [
      { name: "ToolSearcher", args: {"keywords":"record health data"} },
      { name: "RecordHealthData", args: {"user_id":"123ABC","time":"2023-10-15 09:00:00","health_data":"[{"} },
    ],
    mockOutputs: [
      { name: "ToolSearcher", args: {"keywords":"record health data"}, output: {"name":"RecordHealthData","description":"This API records the health history of a patient given user ID, time and health data.","input_parameters":{"user_id":{"type":"str","description":"The ID of user."},"time":{"type":"str","description":"The time of health data. Format: %Y-%m-%d %H:%M:%S"},"health_data":{"type":"list","description":"The health data, with the format like [{'name': 'blood_pressure', 'value': '120/80'}, {'name': 'heart_rate', 'value': '80'}]"}},"output_parameters":{"status":{"type":"str","description":"The status of recording."}}} },
    ]
  },
  {
    id: "L2/43",
    level: 2,
    category: "Level 2 - retrieve then call",
    title: "Can you help me record my blood pressure and heart rate data?",
    requirement: "Can you help me record my blood pressure and heart rate data?",
    task: "User: Can you help me record my blood pressure and heart rate data?\nAI: Sure, Let me check.\nAI: Ah, here it is. May I know your user ID, please?\nUser: My user ID is 1234.\nAI: Great, may I have the time of your health data in the format of `%Y-%m-%d %H:%M:%S`, please?\nUser: The time is 2023-06-05 14:30:00.\nAI: Thank you. Lastly, can you tell me your blood pressure and heart rate data in the following format: `[{'name': 'blood_pressure', 'value': '120/80'}, {'name': 'heart_rate', 'value': '80'}]`?\nUser: Sure. My blood pressure is {'name': 'blood_pressure', 'value': '130/85'} and my heart rate is {'name': 'heart_rate', 'value': '75'}.\nAI: Okay, got it.",
    toolNames: ["ToolSearcher", "RecordHealthData"],
    requiresRetrieval: true,
    expectedCalls: [
      { name: "ToolSearcher", args: {"keywords":"record health data"} },
      { name: "RecordHealthData", args: {"user_id":"1234","time":"2023-06-05 14:30:00","health_data":"[{"} },
    ],
    mockOutputs: [
      { name: "ToolSearcher", args: {"keywords":"record health data"}, output: {"name":"RecordHealthData","description":"This API records the health history of a patient given user ID, time and health data.","input_parameters":{"user_id":{"type":"str","description":"The ID of user."},"time":{"type":"str","description":"The time of health data. Format: %Y-%m-%d %H:%M:%S"},"health_data":{"type":"list","description":"The health data, with the format like [{'name': 'blood_pressure', 'value': '120/80'}, {'name': 'heart_rate', 'value': '80'}]"}},"output_parameters":{"status":{"type":"str","description":"The status of recording."}}} },
    ]
  },
  {
    id: "L2/44",
    level: 2,
    category: "Level 2 - retrieve then call",
    title: "Can you help me find some information about a rash?",
    requirement: "Can you help me find some information about a rash?",
    task: "User: Can you help me find some information about a rash?\nAI: Sure! What specifically do you want to know about the rash?\nUser: I have a rash and I want to know what it could be.\nAI: Okay, let me look that up for you.\nAI: Based on my search results, it looks like there are a few different possibilities for what your rash could be. Would you like me to list them for you?\nUser: Yes, please.\nAI: Alright, here are the top two results: Contact dermatitis and Eczema. Does either of those sound like what you might be experiencing?\nUser: I'm not sure. Can you tell me more about each of them?\nAI: Of course. Let me look up some more information for you.",
    toolNames: ["ToolSearcher", "SymptomSearch"],
    requiresRetrieval: true,
    expectedCalls: [
      { name: "ToolSearcher", args: {"keywords":"rash"} },
      { name: "SymptomSearch", args: {"symptom":"rash"} },
    ],
    mockOutputs: [
      { name: "ToolSearcher", args: {"keywords":"rash"}, output: {"name":"SymptomSearch","description":"This API searches for a given symptom.","input_parameters":{"symptom":{"type":"str","description":"The symptom to search."}},"output_parameters":{"results":{"type":"list","description":"The list of results. Format be like [{\"name\":possible disease name, \"description\": disease details},...]"}}} },
    ]
  },
  {
    id: "L2/45",
    level: 2,
    category: "Level 2 - retrieve then call",
    title: "Hello, can you help me with my skin rash?",
    requirement: "Hello, can you help me with my skin rash?",
    task: "User: Hello, can you help me with my skin rash?\nAI: Of course, let me see if I can find some possible diseases related to your symptoms. Please tell me more about your rash.\nUser: It's a red, bumpy rash on my arm.\nAI: Okay, let me search for some possible causes of your rash.",
    toolNames: ["ToolSearcher", "SymptomSearch"],
    requiresRetrieval: true,
    expectedCalls: [
      { name: "ToolSearcher", args: {"keywords":"skin rash"} },
      { name: "SymptomSearch", args: {"symptom":"rash"} },
    ],
    mockOutputs: [
      { name: "ToolSearcher", args: {"keywords":"skin rash"}, output: {"name":"SymptomSearch","description":"This API searches for a given symptom.","input_parameters":{"symptom":{"type":"str","description":"The symptom to search."}},"output_parameters":{"results":{"type":"list","description":"The list of results. Format be like [{\"name\":possible disease name, \"description\": disease details},...]"}}} },
    ]
  },
  {
    id: "L2/46",
    level: 2,
    category: "Level 2 - retrieve then call",
    title: "Can you help me find information about a rash?",
    requirement: "Can you help me find information about a rash?",
    task: "User: Can you help me find information about a rash?\nAI: Sure, what specific information do you need about the rash?\nUser: I have this rash on my arm and I'd like to know what it could be.\nAI: Let me search for possible causes of rashes.",
    toolNames: ["ToolSearcher", "SymptomSearch"],
    requiresRetrieval: true,
    expectedCalls: [
      { name: "ToolSearcher", args: {"keywords":"rash"} },
      { name: "SymptomSearch", args: {"symptom":"rash"} },
    ],
    mockOutputs: [
      { name: "ToolSearcher", args: {"keywords":"rash"}, output: {"name":"SymptomSearch","description":"This API searches for a given symptom.","input_parameters":{"symptom":{"type":"str","description":"The symptom to search."}},"output_parameters":{"results":{"type":"list","description":"The list of results. Format be like [{\"name\":possible disease name, \"description\": disease details},...]"}}} },
    ]
  },
  {
    id: "L2/47",
    level: 2,
    category: "Level 2 - retrieve then call",
    title: "Can you help me find some information on a rash I've been experiencin…",
    requirement: "Can you help me find some information on a rash I've been experiencing?",
    task: "User: Can you help me find some information on a rash I've been experiencing?\nAI: Sure.",
    toolNames: ["ToolSearcher", "SymptomSearch"],
    requiresRetrieval: true,
    expectedCalls: [
      { name: "ToolSearcher", args: {"keywords":"rash"} },
      { name: "SymptomSearch", args: {"symptom":"rash"} },
    ],
    mockOutputs: [
      { name: "ToolSearcher", args: {"keywords":"rash"}, output: {"name":"SymptomSearch","description":"This API searches for a given symptom.","input_parameters":{"symptom":{"type":"str","description":"The symptom to search."}},"output_parameters":{"results":{"type":"list","description":"The list of results. Format be like [{\"name\":possible disease name, \"description\": disease details},...]"}}} },
    ]
  },
  {
    id: "L2/48",
    level: 2,
    category: "Level 2 - retrieve then call",
    title: "Can you help me find some possible illnesses that cause a rash?",
    requirement: "Can you help me find some possible illnesses that cause a rash?",
    task: "User: Can you help me find some possible illnesses that cause a rash?\nAI: Sure, let me search for that.",
    toolNames: ["ToolSearcher", "SymptomSearch"],
    requiresRetrieval: true,
    expectedCalls: [
      { name: "ToolSearcher", args: {"keywords":"illness rash"} },
      { name: "SymptomSearch", args: {"symptom":"rash"} },
    ],
    mockOutputs: [
      { name: "ToolSearcher", args: {"keywords":"illness rash"}, output: {"name":"SymptomSearch","description":"This API searches for a given symptom.","input_parameters":{"symptom":{"type":"str","description":"The symptom to search."}},"output_parameters":{"results":{"type":"list","description":"The list of results. Format be like [{\"name\":possible disease name, \"description\": disease details},...]"}}} },
    ]
  },
  {
    id: "L3/0",
    level: 3,
    category: "Level 3 - multi-call planning",
    title: "Query meeting of John and send email reminder to john@example.com.",
    requirement: "Query meeting of John and send email reminder to john@example.com.",
    task: "Query meeting of John and send email reminder to john@example.com.",
    toolNames: ["ToolSearcher", "QueryMeeting", "EmailReminder"],
    requiresRetrieval: true,
    expectedCalls: [
      { name: "ToolSearcher", args: {"keywords":"QueryMeeting"} },
      { name: "QueryMeeting", args: {"user_name":"John"} },
      { name: "ToolSearcher", args: {"keywords":"EmailReminder"} },
      { name: "EmailReminder", args: {"content":"Meeting with the client will be held at Room 1. Please be there on time.","time":"2021-01-01 10:00:00","location":"Room 1","recipient":"john@example.com"} },
      { name: "EmailReminder", args: {"content":"Meeting about the new project will be held at Room 2. Please be there on time.","time":"2021-01-02 10:00:00","location":"Room 2","recipient":"john@example.com"} },
    ],
    mockOutputs: [
      { name: "ToolSearcher", args: {"keywords":"QueryMeeting"}, output: {"name":"QueryMeeting","description":"The API for retrieving the meeting details from the user's calendar.","input_parameters":{"user_name":{"type":"str","description":"Name of the user."}},"output_parameters":{"meetings":{"type":"list","description":"List of meetings."}}} },
      { name: "QueryMeeting", args: {"user_name":"John"}, output: {"meetings":[{"meeting_id":1,"meeting_name":"Meeting with the client","meeting_time":"2021-01-01 10:00:00","meeting_location":"Room 1","meeting_attendees":["John","Mary","Peter"]},{"meeting_id":2,"meeting_name":"Meeting about the new project","meeting_time":"2021-01-02 10:00:00","meeting_location":"Room 2","meeting_attendees":["John","Mary","Peter"]}]} },
      { name: "ToolSearcher", args: {"keywords":"EmailReminder"}, output: {"name":"EmailReminder","description":"This API sends an email reminder to the user with the meeting details.","input_parameters":{"content":{"type":"str","description":"The content of the email."},"time":{"type":"str","description":"The time for the meeting. Format: %Y-%m-%d %H:%M:%S"},"location":{"type":"str","description":"The location of the meeting."},"recipient":{"type":"str","description":"The email address of the recipient."}},"output_parameters":{"status":{"type":"str","description":"success or failed"}}} },
      { name: "EmailReminder", args: {"content":"Meeting with the client will be held at Room 1. Please be there on time.","time":"2021-01-01 10:00:00","location":"Room 1","recipient":"john@example.com"}, output: "success" },
      { name: "EmailReminder", args: {"content":"Meeting about the new project will be held at Room 2. Please be there on time.","time":"2021-01-02 10:00:00","location":"Room 2","recipient":"john@example.com"}, output: "success" },
    ]
  },
  {
    id: "L3/1",
    level: 3,
    category: "Level 3 - multi-call planning",
    title: "Query meeting of Mary and send email reminder to mary@example.com",
    requirement: "Query meeting of Mary and send email reminder to mary@example.com",
    task: "Query meeting of Mary and send email reminder to mary@example.com",
    toolNames: ["ToolSearcher", "QueryMeeting", "EmailReminder"],
    requiresRetrieval: true,
    expectedCalls: [
      { name: "ToolSearcher", args: {"keywords":"QueryMeeting"} },
      { name: "QueryMeeting", args: {"user_name":"Mary"} },
      { name: "ToolSearcher", args: {"keywords":"EmailReminder"} },
      { name: "EmailReminder", args: {"content":"Meeting with the client will be held at Room 1. Please be there on time.","time":"2021-01-01 10:00:00","location":"Room 1","recipient":"mary@example.com"} },
    ],
    mockOutputs: [
      { name: "ToolSearcher", args: {"keywords":"QueryMeeting"}, output: {"name":"QueryMeeting","description":"The API for retrieving the meeting details from the user's calendar.","input_parameters":{"user_name":{"type":"str","description":"Name of the user."}},"output_parameters":{"meetings":{"type":"list","description":"List of meetings."}}} },
      { name: "QueryMeeting", args: {"user_name":"Mary"}, output: {"meetings":[{"meeting_id":1,"meeting_name":"Meeting with the client","meeting_time":"2021-01-01 10:00:00","meeting_location":"Room 1","meeting_attendees":["John","Mary","Peter"]},{"meeting_id":2,"meeting_name":"Meeting about the new project","meeting_time":"2021-01-02 10:00:00","meeting_location":"Room 2","meeting_attendees":["John","Mary","Peter"]}]} },
      { name: "ToolSearcher", args: {"keywords":"EmailReminder"}, output: {"name":"EmailReminder","description":"This API sends an email reminder to the user with the meeting details.","input_parameters":{"content":{"type":"str","description":"The content of the email."},"time":{"type":"str","description":"The time for the meeting. Format: %Y-%m-%d %H:%M:%S"},"location":{"type":"str","description":"The location of the meeting."},"recipient":{"type":"str","description":"The email address of the recipient."}},"output_parameters":{"status":{"type":"str","description":"success or failed"}}} },
      { name: "EmailReminder", args: {"content":"Meeting with the client will be held at Room 1. Please be there on time.","time":"2021-01-01 10:00:00","location":"Room 1","recipient":"mary@example.com"}, output: "success" },
    ]
  },
  {
    id: "L3/2",
    level: 3,
    category: "Level 3 - multi-call planning",
    title: "Query meeting of Peter and send email reminder to peter@example.com",
    requirement: "Query meeting of Peter and send email reminder to peter@example.com",
    task: "Query meeting of Peter and send email reminder to peter@example.com",
    toolNames: ["ToolSearcher", "QueryMeeting", "EmailReminder"],
    requiresRetrieval: true,
    expectedCalls: [
      { name: "ToolSearcher", args: {"keywords":"QueryMeeting"} },
      { name: "QueryMeeting", args: {"user_name":"Peter"} },
      { name: "ToolSearcher", args: {"keywords":"EmailReminder"} },
      { name: "EmailReminder", args: {"content":"Meeting with the client will be held at Room 1. Please be there on time.","time":"2021-01-01 10:00:00","location":"Room 1","recipient":"peter@example.com"} },
    ],
    mockOutputs: [
      { name: "ToolSearcher", args: {"keywords":"QueryMeeting"}, output: {"name":"QueryMeeting","description":"The API for retrieving the meeting details from the user's calendar.","input_parameters":{"user_name":{"type":"str","description":"Name of the user."}},"output_parameters":{"meetings":{"type":"list","description":"List of meetings."}}} },
      { name: "QueryMeeting", args: {"user_name":"Peter"}, output: {"meetings":[{"meeting_id":1,"meeting_name":"Meeting with the client","meeting_time":"2021-01-01 10:00:00","meeting_location":"Room 1","meeting_attendees":["John","Mary","Peter"]},{"meeting_id":2,"meeting_name":"Meeting about the new project","meeting_time":"2021-01-02 10:00:00","meeting_location":"Room 2","meeting_attendees":["John","Mary","Peter"]}]} },
      { name: "ToolSearcher", args: {"keywords":"EmailReminder"}, output: {"name":"EmailReminder","description":"This API sends an email reminder to the user with the meeting details.","input_parameters":{"content":{"type":"str","description":"The content of the email."},"time":{"type":"str","description":"The time for the meeting. Format: %Y-%m-%d %H:%M:%S"},"location":{"type":"str","description":"The location of the meeting."},"recipient":{"type":"str","description":"The email address of the recipient."}},"output_parameters":{"status":{"type":"str","description":"success or failed"}}} },
      { name: "EmailReminder", args: {"content":"Meeting with the client will be held at Room 1. Please be there on time.","time":"2021-01-01 10:00:00","location":"Room 1","recipient":"peter@example.com"}, output: "success" },
    ]
  },
  {
    id: "L3/3",
    level: 3,
    category: "Level 3 - multi-call planning",
    title: "Query meeting of Tom and send email reminder to tom@example.com",
    requirement: "Query meeting of Tom and send email reminder to tom@example.com",
    task: "Query meeting of Tom and send email reminder to tom@example.com",
    toolNames: ["ToolSearcher", "QueryMeeting", "EmailReminder"],
    requiresRetrieval: true,
    expectedCalls: [
      { name: "ToolSearcher", args: {"keywords":"QueryMeeting"} },
      { name: "QueryMeeting", args: {"user_name":"Tom"} },
      { name: "ToolSearcher", args: {"keywords":"EmailReminder"} },
      { name: "EmailReminder", args: {"content":"Meeting will be held at Room 1. Please be there on time.","time":"2021-01-01 10:00:00","location":"Room 1","recipient":"tom@example.com"} },
    ],
    mockOutputs: [
      { name: "ToolSearcher", args: {"keywords":"QueryMeeting"}, output: {"name":"QueryMeeting","description":"The API for retrieving the meeting details from the user's calendar.","input_parameters":{"user_name":{"type":"str","description":"Name of the user."}},"output_parameters":{"meetings":{"type":"list","description":"List of meetings."}}} },
      { name: "QueryMeeting", args: {"user_name":"Tom"}, output: {"meetings":[{"meeting_id":1,"meeting_name":"Meeting","meeting_time":"2021-01-01 10:00:00","meeting_location":"Room 1","meeting_attendees":["Tom","Jerry"]}]} },
      { name: "ToolSearcher", args: {"keywords":"EmailReminder"}, output: {"name":"EmailReminder","description":"This API sends an email reminder to the user with the meeting details.","input_parameters":{"content":{"type":"str","description":"The content of the email."},"time":{"type":"str","description":"The time for the meeting. Format: %Y-%m-%d %H:%M:%S"},"location":{"type":"str","description":"The location of the meeting."},"recipient":{"type":"str","description":"The email address of the recipient."}},"output_parameters":{"status":{"type":"str","description":"success or failed"}}} },
      { name: "EmailReminder", args: {"content":"Meeting will be held at Room 1. Please be there on time.","time":"2021-01-01 10:00:00","location":"Room 1","recipient":"tom@example.com"}, output: "success" },
    ]
  },
  {
    id: "L3/4",
    level: 3,
    category: "Level 3 - multi-call planning",
    title: "Query meeting of Jerry and send email reminder to jerry@example.com",
    requirement: "Query meeting of Jerry and send email reminder to jerry@example.com",
    task: "Query meeting of Jerry and send email reminder to jerry@example.com",
    toolNames: ["ToolSearcher", "QueryMeeting", "EmailReminder"],
    requiresRetrieval: true,
    expectedCalls: [
      { name: "ToolSearcher", args: {"keywords":"QueryMeeting"} },
      { name: "QueryMeeting", args: {"user_name":"Jerry"} },
      { name: "ToolSearcher", args: {"keywords":"EmailReminder"} },
      { name: "EmailReminder", args: {"content":"Meeting will be held at Room 1. Please be there on time.","time":"2021-01-01 10:00:00","location":"Room 1","recipient":"jerry@example.com"} },
    ],
    mockOutputs: [
      { name: "ToolSearcher", args: {"keywords":"QueryMeeting"}, output: {"name":"QueryMeeting","description":"The API for retrieving the meeting details from the user's calendar.","input_parameters":{"user_name":{"type":"str","description":"Name of the user."}},"output_parameters":{"meetings":{"type":"list","description":"List of meetings."}}} },
      { name: "QueryMeeting", args: {"user_name":"Jerry"}, output: {"meetings":[{"meeting_id":1,"meeting_name":"Meeting","meeting_time":"2021-01-01 10:00:00","meeting_location":"Room 1","meeting_attendees":["Tom","Jerry"]}]} },
      { name: "ToolSearcher", args: {"keywords":"EmailReminder"}, output: {"name":"EmailReminder","description":"This API sends an email reminder to the user with the meeting details.","input_parameters":{"content":{"type":"str","description":"The content of the email."},"time":{"type":"str","description":"The time for the meeting. Format: %Y-%m-%d %H:%M:%S"},"location":{"type":"str","description":"The location of the meeting."},"recipient":{"type":"str","description":"The email address of the recipient."}},"output_parameters":{"status":{"type":"str","description":"success or failed"}}} },
      { name: "EmailReminder", args: {"content":"Meeting will be held at Room 1. Please be there on time.","time":"2021-01-01 10:00:00","location":"Room 1","recipient":"jerry@example.com"}, output: "success" },
    ]
  },
  {
    id: "L3/5",
    level: 3,
    category: "Level 3 - multi-call planning",
    title: "Get the current weather forecast for a specific location (latitude=40…",
    requirement: "Get the current weather forecast for a specific location (latitude=40.7128, longitude=74.006) and provide clothing recommendations based on the weather conditions.",
    task: "Get the current weather forecast for a specific location (latitude=40.7128, longitude=74.006) and provide clothing recommendations based on the weather conditions.",
    toolNames: ["ToolSearcher", "GetWeatherForCoordinates", "ClothingRecommendation"],
    requiresRetrieval: true,
    expectedCalls: [
      { name: "ToolSearcher", args: {"keywords":"GetWeatherForCoordinates"} },
      { name: "GetWeatherForCoordinates", args: {"latitude":"40.7128","longitude":"74.0060"} },
      { name: "ToolSearcher", args: {"keywords":"ClothingRecommendation"} },
      { name: "ClothingRecommendation", args: {"temperature":10,"humidity":0.5,"weather_conditions":"Clear"} },
    ],
    mockOutputs: [
      { name: "ToolSearcher", args: {"keywords":"GetWeatherForCoordinates"}, output: {"name":"GetWeatherForCoordinates","description":"Retrieves current weather information based on the provided coordinates.","input_parameters":{"latitude":{"type":"float","description":"Latitude of the location."},"longitude":{"type":"float","description":"Longitude of the location."}},"output_parameters":{"temperature":{"type":"float","description":"Current temperature in Celsius."},"humidity":{"type":"float","description":"Current humidity level."},"description":{"type":"str","description":"Weather description."}}} },
      { name: "GetWeatherForCoordinates", args: {"latitude":"40.7128","longitude":"74.0060"}, output: {"temperature":10,"humidity":0.5,"description":"Clear"} },
      { name: "ToolSearcher", args: {"keywords":"ClothingRecommendation"}, output: {"name":"ClothingRecommendation","description":"API for providing clothing recommendations based on weather conditions.","input_parameters":{"temperature":{"type":"float","description":"Temperature in Celsius."},"humidity":{"type":"float","description":"Relative humidity in percentage."},"weather_conditions":{"type":"str","description":"Description of weather conditions."}},"output_parameters":{"clothing_options":{"type":"list","description":"List of recommended clothing options."}}} },
      { name: "ClothingRecommendation", args: {"temperature":10,"humidity":0.5,"weather_conditions":"Clear"}, output: {"clothing_options":["Light jacket","Long-sleeved shirt"]} },
    ]
  },
  {
    id: "L3/6",
    level: 3,
    category: "Level 3 - multi-call planning",
    title: "Get the current weather forecast for a specific location (latitude=37…",
    requirement: "Get the current weather forecast for a specific location (latitude=37.7749, longitude=122.4194) and provide clothing recommendations based on the weather conditions.",
    task: "Get the current weather forecast for a specific location (latitude=37.7749, longitude=122.4194) and provide clothing recommendations based on the weather conditions.",
    toolNames: ["ToolSearcher", "GetWeatherForCoordinates", "ClothingRecommendation"],
    requiresRetrieval: true,
    expectedCalls: [
      { name: "ToolSearcher", args: {"keywords":"GetWeatherForCoordinates"} },
      { name: "GetWeatherForCoordinates", args: {"latitude":"37.7749","longitude":"122.4194"} },
      { name: "ToolSearcher", args: {"keywords":"ClothingRecommendation"} },
      { name: "ClothingRecommendation", args: {"temperature":20,"humidity":0.8,"weather_conditions":"Cloudy"} },
    ],
    mockOutputs: [
      { name: "ToolSearcher", args: {"keywords":"GetWeatherForCoordinates"}, output: {"name":"GetWeatherForCoordinates","description":"Retrieves current weather information based on the provided coordinates.","input_parameters":{"latitude":{"type":"float","description":"Latitude of the location."},"longitude":{"type":"float","description":"Longitude of the location."}},"output_parameters":{"temperature":{"type":"float","description":"Current temperature in Celsius."},"humidity":{"type":"float","description":"Current humidity level."},"description":{"type":"str","description":"Weather description."}}} },
      { name: "GetWeatherForCoordinates", args: {"latitude":"37.7749","longitude":"122.4194"}, output: {"temperature":20,"humidity":0.8,"description":"Cloudy"} },
      { name: "ToolSearcher", args: {"keywords":"ClothingRecommendation"}, output: {"name":"ClothingRecommendation","description":"API for providing clothing recommendations based on weather conditions.","input_parameters":{"temperature":{"type":"float","description":"Temperature in Celsius."},"humidity":{"type":"float","description":"Relative humidity in percentage."},"weather_conditions":{"type":"str","description":"Description of weather conditions."}},"output_parameters":{"clothing_options":{"type":"list","description":"List of recommended clothing options."}}} },
      { name: "ClothingRecommendation", args: {"temperature":20,"humidity":0.8,"weather_conditions":"Cloudy"}, output: {"clothing_options":["T-shirt","Shorts"]} },
    ]
  },
  {
    id: "L3/7",
    level: 3,
    category: "Level 3 - multi-call planning",
    title: "Get the current weather forecast for a specific location (latitude=51…",
    requirement: "Get the current weather forecast for a specific location (latitude=51.5074, longitude=0.1278) and provide clothing recommendations based on the weather conditions.",
    task: "Get the current weather forecast for a specific location (latitude=51.5074, longitude=0.1278) and provide clothing recommendations based on the weather conditions.",
    toolNames: ["ToolSearcher", "GetWeatherForCoordinates", "ClothingRecommendation"],
    requiresRetrieval: true,
    expectedCalls: [
      { name: "ToolSearcher", args: {"keywords":"GetWeatherForCoordinates"} },
      { name: "GetWeatherForCoordinates", args: {"latitude":"51.5074","longitude":"0.1278"} },
      { name: "ToolSearcher", args: {"keywords":"ClothingRecommendation"} },
      { name: "ClothingRecommendation", args: {"temperature":5,"humidity":0.9,"weather_conditions":"Rainy"} },
    ],
    mockOutputs: [
      { name: "ToolSearcher", args: {"keywords":"GetWeatherForCoordinates"}, output: {"name":"GetWeatherForCoordinates","description":"Retrieves current weather information based on the provided coordinates.","input_parameters":{"latitude":{"type":"float","description":"Latitude of the location."},"longitude":{"type":"float","description":"Longitude of the location."}},"output_parameters":{"temperature":{"type":"float","description":"Current temperature in Celsius."},"humidity":{"type":"float","description":"Current humidity level."},"description":{"type":"str","description":"Weather description."}}} },
      { name: "GetWeatherForCoordinates", args: {"latitude":"51.5074","longitude":"0.1278"}, output: {"temperature":5,"humidity":0.9,"description":"Rainy"} },
      { name: "ToolSearcher", args: {"keywords":"ClothingRecommendation"}, output: {"name":"ClothingRecommendation","description":"API for providing clothing recommendations based on weather conditions.","input_parameters":{"temperature":{"type":"float","description":"Temperature in Celsius."},"humidity":{"type":"float","description":"Relative humidity in percentage."},"weather_conditions":{"type":"str","description":"Description of weather conditions."}},"output_parameters":{"clothing_options":{"type":"list","description":"List of recommended clothing options."}}} },
      { name: "ClothingRecommendation", args: {"temperature":5,"humidity":0.9,"weather_conditions":"Rainy"}, output: {"clothing_options":["Warm coat","Hat","Gloves","Raincoat"]} },
    ]
  },
  {
    id: "L3/8",
    level: 3,
    category: "Level 3 - multi-call planning",
    title: "Get the current weather forecast for a specific location (latitude=48…",
    requirement: "Get the current weather forecast for a specific location (latitude=48.8566, longitude=2.3522) and provide clothing recommendations based on the weather conditions.",
    task: "Get the current weather forecast for a specific location (latitude=48.8566, longitude=2.3522) and provide clothing recommendations based on the weather conditions.",
    toolNames: ["ToolSearcher", "GetWeatherForCoordinates", "ClothingRecommendation"],
    requiresRetrieval: true,
    expectedCalls: [
      { name: "ToolSearcher", args: {"keywords":"GetWeatherForCoordinates"} },
      { name: "GetWeatherForCoordinates", args: {"latitude":"48.8566","longitude":"2.3522"} },
      { name: "ToolSearcher", args: {"keywords":"ClothingRecommendation"} },
      { name: "ClothingRecommendation", args: {"temperature":15,"humidity":0.7,"weather_conditions":"Sunny"} },
    ],
    mockOutputs: [
      { name: "ToolSearcher", args: {"keywords":"GetWeatherForCoordinates"}, output: {"name":"GetWeatherForCoordinates","description":"Retrieves current weather information based on the provided coordinates.","input_parameters":{"latitude":{"type":"float","description":"Latitude of the location."},"longitude":{"type":"float","description":"Longitude of the location."}},"output_parameters":{"temperature":{"type":"float","description":"Current temperature in Celsius."},"humidity":{"type":"float","description":"Current humidity level."},"description":{"type":"str","description":"Weather description."}}} },
      { name: "GetWeatherForCoordinates", args: {"latitude":"48.8566","longitude":"2.3522"}, output: {"temperature":15,"humidity":0.7,"description":"Sunny"} },
      { name: "ToolSearcher", args: {"keywords":"ClothingRecommendation"}, output: {"name":"ClothingRecommendation","description":"API for providing clothing recommendations based on weather conditions.","input_parameters":{"temperature":{"type":"float","description":"Temperature in Celsius."},"humidity":{"type":"float","description":"Relative humidity in percentage."},"weather_conditions":{"type":"str","description":"Description of weather conditions."}},"output_parameters":{"clothing_options":{"type":"list","description":"List of recommended clothing options."}}} },
      { name: "ClothingRecommendation", args: {"temperature":15,"humidity":0.7,"weather_conditions":"Sunny"}, output: {"clothing_options":["Light jacket","Long-sleeved shirt"]} },
    ]
  },
  {
    id: "L3/9",
    level: 3,
    category: "Level 3 - multi-call planning",
    title: "Get the current weather forecast for a specific location (latitude=35…",
    requirement: "Get the current weather forecast for a specific location (latitude=35.6762, longitude=139.6503) and provide clothing recommendations based on the weather conditions.",
    task: "Get the current weather forecast for a specific location (latitude=35.6762, longitude=139.6503) and provide clothing recommendations based on the weather conditions.",
    toolNames: ["ToolSearcher", "GetWeatherForCoordinates", "ClothingRecommendation"],
    requiresRetrieval: true,
    expectedCalls: [
      { name: "ToolSearcher", args: {"keywords":"GetWeatherForCoordinates"} },
      { name: "GetWeatherForCoordinates", args: {"latitude":"35.6762","longitude":"139.6503"} },
      { name: "ToolSearcher", args: {"keywords":"ClothingRecommendation"} },
      { name: "ClothingRecommendation", args: {"temperature":25,"humidity":0.6,"weather_conditions":"Rainy"} },
    ],
    mockOutputs: [
      { name: "ToolSearcher", args: {"keywords":"GetWeatherForCoordinates"}, output: {"name":"GetWeatherForCoordinates","description":"Retrieves current weather information based on the provided coordinates.","input_parameters":{"latitude":{"type":"float","description":"Latitude of the location."},"longitude":{"type":"float","description":"Longitude of the location."}},"output_parameters":{"temperature":{"type":"float","description":"Current temperature in Celsius."},"humidity":{"type":"float","description":"Current humidity level."},"description":{"type":"str","description":"Weather description."}}} },
      { name: "GetWeatherForCoordinates", args: {"latitude":"35.6762","longitude":"139.6503"}, output: {"temperature":25,"humidity":0.6,"description":"Rainy"} },
      { name: "ToolSearcher", args: {"keywords":"ClothingRecommendation"}, output: {"name":"ClothingRecommendation","description":"API for providing clothing recommendations based on weather conditions.","input_parameters":{"temperature":{"type":"float","description":"Temperature in Celsius."},"humidity":{"type":"float","description":"Relative humidity in percentage."},"weather_conditions":{"type":"str","description":"Description of weather conditions."}},"output_parameters":{"clothing_options":{"type":"list","description":"List of recommended clothing options."}}} },
      { name: "ClothingRecommendation", args: {"temperature":25,"humidity":0.6,"weather_conditions":"Rainy"}, output: {"clothing_options":["T-shirt","Shorts","Raincoat"]} },
    ]
  },
  {
    id: "L3/10",
    level: 3,
    category: "Level 3 - multi-call planning",
    title: "Book a meeting for me, including all employees in the Alibaba who are…",
    requirement: "Book a meeting for me, including all employees in the Alibaba who are not traveling. Today is 2023.6.8, the meeting is from 14:00 to 15:00.",
    task: "Book a meeting for me, including all employees in the Alibaba who are not traveling. Today is 2023.6.8, the meeting is from 14:00 to 15:00.",
    toolNames: ["ToolSearcher", "OrganizationMembers", "TravelStatus", "AddMeeting"],
    requiresRetrieval: true,
    expectedCalls: [
      { name: "ToolSearcher", args: {"keywords":"OrganizationMembers"} },
      { name: "OrganizationMembers", args: {"organization":"Alibaba"} },
      { name: "ToolSearcher", args: {"keywords":"TravelStatus"} },
      { name: "TravelStatus", args: {"member_name":"John"} },
      { name: "TravelStatus", args: {"member_name":"Mary"} },
      { name: "TravelStatus", args: {"member_name":"Peter"} },
      { name: "ToolSearcher", args: {"keywords":"AddMeeting"} },
      { name: "AddMeeting", args: {"meeting_topic":"Team Meeting","start_time":"2023-06-08 14:00:00","end_time":"2023-06-08 15:00:00","location":"Conference Room A","attendees":["Mary","Peter"]} },
    ],
    mockOutputs: [
      { name: "ToolSearcher", args: {"keywords":"OrganizationMembers"}, output: {"name":"OrganizationMembers","description":"API to retrieve the list of members in the organization.","input_parameters":{"organization":{"type":"str","description":"Name of the organization."}},"output_parameters":{"members":{"type":"list","description":"List of organization members."}}} },
      { name: "OrganizationMembers", args: {"organization":"Alibaba"}, output: {"members":["John","Mary","Peter"]} },
      { name: "ToolSearcher", args: {"keywords":"TravelStatus"}, output: {"name":"TravelStatus","description":"API for retrieving the current travel status of each member.","input_parameters":{"member_name":{"type":"str","description":"Name of the member."}},"output_parameters":{"status":{"type":"str","description":"Travel status"}}} },
      { name: "TravelStatus", args: {"member_name":"John"}, output: "Traveling" },
      { name: "TravelStatus", args: {"member_name":"Mary"}, output: "Working from home" },
      { name: "TravelStatus", args: {"member_name":"Peter"}, output: "Working from office" },
      { name: "ToolSearcher", args: {"keywords":"AddMeeting"}, output: {"name":"AddMeeting","description":"This API allows users to make a reservation for a meeting and store the meeting information in the database.Function：Allow users to make a reservation for a meeting.Exception Handling：1. If the reservation is successful, return a success message.2. If the reservation fails, return a corresponding error message.","input_parameters":{"meeting_topic":{"type":"str","description":"The title of the meeting, no more than 50 characters."},"start_time":{"type":"str","description":"The start time of the meeting, in the pattern of %Y-%m-%d %H:%M:%S"},"end_time":{"type":"str","description":"The end time of the meeting, in the pattern of %Y-%m-%d %H:%M:%S"},"location":{"type":"str","description":"The location where the meeting to be held, no more than 100 characters."},"attendees":{"type":"list(str)","description":"The attendees of the meeting, including names, positions and other information."}},"output_parameters":{"status":{"type":"str","description":"success or failed"}}} },
      { name: "AddMeeting", args: {"meeting_topic":"Team Meeting","start_time":"2023-06-08 14:00:00","end_time":"2023-06-08 15:00:00","location":"Conference Room A","attendees":["Mary","Peter"]}, output: "success" },
    ]
  },
  {
    id: "L3/11",
    level: 3,
    category: "Level 3 - multi-call planning",
    title: "Book a meeting for me, including all employees in the Tencent who are…",
    requirement: "Book a meeting for me, including all employees in the Tencent who are not traveling. Today is 2023.6.8, the meeting is from 14:00 to 15:00.",
    task: "Book a meeting for me, including all employees in the Tencent who are not traveling. Today is 2023.6.8, the meeting is from 14:00 to 15:00.",
    toolNames: ["ToolSearcher", "OrganizationMembers", "TravelStatus", "AddMeeting"],
    requiresRetrieval: true,
    expectedCalls: [
      { name: "ToolSearcher", args: {"keywords":"OrganizationMembers"} },
      { name: "OrganizationMembers", args: {"organization":"Tencent"} },
      { name: "ToolSearcher", args: {"keywords":"TravelStatus"} },
      { name: "TravelStatus", args: {"member_name":"Tom"} },
      { name: "TravelStatus", args: {"member_name":"Jerry"} },
      { name: "ToolSearcher", args: {"keywords":"AddMeeting"} },
      { name: "AddMeeting", args: {"meeting_topic":"Team Meeting","start_time":"2023-06-08 14:00:00","end_time":"2023-06-08 15:00:00","location":"Conference Room A","attendees":["Jerry"]} },
    ],
    mockOutputs: [
      { name: "ToolSearcher", args: {"keywords":"OrganizationMembers"}, output: {"name":"OrganizationMembers","description":"API to retrieve the list of members in the organization.","input_parameters":{"organization":{"type":"str","description":"Name of the organization."}},"output_parameters":{"members":{"type":"list","description":"List of organization members."}}} },
      { name: "OrganizationMembers", args: {"organization":"Tencent"}, output: {"members":["Tom","Jerry"]} },
      { name: "ToolSearcher", args: {"keywords":"TravelStatus"}, output: {"name":"TravelStatus","description":"API for retrieving the current travel status of each member.","input_parameters":{"member_name":{"type":"str","description":"Name of the member."}},"output_parameters":{"status":{"type":"str","description":"Travel status"}}} },
      { name: "TravelStatus", args: {"member_name":"Tom"}, output: "Traveling" },
      { name: "TravelStatus", args: {"member_name":"Jerry"}, output: "Working from home" },
      { name: "ToolSearcher", args: {"keywords":"AddMeeting"}, output: {"name":"AddMeeting","description":"This API allows users to make a reservation for a meeting and store the meeting information in the database.Function：Allow users to make a reservation for a meeting.Exception Handling：1. If the reservation is successful, return a success message.2. If the reservation fails, return a corresponding error message.","input_parameters":{"meeting_topic":{"type":"str","description":"The title of the meeting, no more than 50 characters."},"start_time":{"type":"str","description":"The start time of the meeting, in the pattern of %Y-%m-%d %H:%M:%S"},"end_time":{"type":"str","description":"The end time of the meeting, in the pattern of %Y-%m-%d %H:%M:%S"},"location":{"type":"str","description":"The location where the meeting to be held, no more than 100 characters."},"attendees":{"type":"list(str)","description":"The attendees of the meeting, including names, positions and other information."}},"output_parameters":{"status":{"type":"str","description":"success or failed"}}} },
      { name: "AddMeeting", args: {"meeting_topic":"Team Meeting","start_time":"2023-06-08 14:00:00","end_time":"2023-06-08 15:00:00","location":"Conference Room A","attendees":["Jerry"]}, output: "success" },
    ]
  },
  {
    id: "L3/12",
    level: 3,
    category: "Level 3 - multi-call planning",
    title: "Book a meeting for me, including all employees in the Baidu who are n…",
    requirement: "Book a meeting for me, including all employees in the Baidu who are not traveling. Today is 2023.6.8, the meeting is from 14:00 to 15:00.",
    task: "Book a meeting for me, including all employees in the Baidu who are not traveling. Today is 2023.6.8, the meeting is from 14:00 to 15:00.",
    toolNames: ["ToolSearcher", "OrganizationMembers", "TravelStatus", "AddMeeting"],
    requiresRetrieval: true,
    expectedCalls: [
      { name: "ToolSearcher", args: {"keywords":"OrganizationMembers"} },
      { name: "OrganizationMembers", args: {"organization":"Baidu"} },
      { name: "ToolSearcher", args: {"keywords":"TravelStatus"} },
      { name: "TravelStatus", args: {"member_name":"Jack"} },
      { name: "TravelStatus", args: {"member_name":"Rose"} },
      { name: "ToolSearcher", args: {"keywords":"AddMeeting"} },
      { name: "AddMeeting", args: {"meeting_topic":"Team Meeting","start_time":"2023-06-08 14:00:00","end_time":"2023-06-08 15:00:00","location":"Conference Room A","attendees":["Jack","Rose"]} },
    ],
    mockOutputs: [
      { name: "ToolSearcher", args: {"keywords":"OrganizationMembers"}, output: {"name":"OrganizationMembers","description":"API to retrieve the list of members in the organization.","input_parameters":{"organization":{"type":"str","description":"Name of the organization."}},"output_parameters":{"members":{"type":"list","description":"List of organization members."}}} },
      { name: "OrganizationMembers", args: {"organization":"Baidu"}, output: {"members":["Jack","Rose"]} },
      { name: "ToolSearcher", args: {"keywords":"TravelStatus"}, output: {"name":"TravelStatus","description":"API for retrieving the current travel status of each member.","input_parameters":{"member_name":{"type":"str","description":"Name of the member."}},"output_parameters":{"status":{"type":"str","description":"Travel status"}}} },
      { name: "TravelStatus", args: {"member_name":"Jack"}, output: "Working from office" },
      { name: "TravelStatus", args: {"member_name":"Rose"}, output: "Working from office" },
      { name: "ToolSearcher", args: {"keywords":"AddMeeting"}, output: {"name":"AddMeeting","description":"This API allows users to make a reservation for a meeting and store the meeting information in the database.Function：Allow users to make a reservation for a meeting.Exception Handling：1. If the reservation is successful, return a success message.2. If the reservation fails, return a corresponding error message.","input_parameters":{"meeting_topic":{"type":"str","description":"The title of the meeting, no more than 50 characters."},"start_time":{"type":"str","description":"The start time of the meeting, in the pattern of %Y-%m-%d %H:%M:%S"},"end_time":{"type":"str","description":"The end time of the meeting, in the pattern of %Y-%m-%d %H:%M:%S"},"location":{"type":"str","description":"The location where the meeting to be held, no more than 100 characters."},"attendees":{"type":"list(str)","description":"The attendees of the meeting, including names, positions and other information."}},"output_parameters":{"status":{"type":"str","description":"success or failed"}}} },
      { name: "AddMeeting", args: {"meeting_topic":"Team Meeting","start_time":"2023-06-08 14:00:00","end_time":"2023-06-08 15:00:00","location":"Conference Room A","attendees":["Jack","Rose"]}, output: "success" },
    ]
  },
  {
    id: "L3/13",
    level: 3,
    category: "Level 3 - multi-call planning",
    title: "Book a meeting for me, including all employees in the ByteDance who a…",
    requirement: "Book a meeting for me, including all employees in the ByteDance who are not traveling. Today is 2023.6.8, the meeting is from 14:00 to 15:00.",
    task: "Book a meeting for me, including all employees in the ByteDance who are not traveling. Today is 2023.6.8, the meeting is from 14:00 to 15:00.",
    toolNames: ["ToolSearcher", "OrganizationMembers", "TravelStatus", "AddMeeting"],
    requiresRetrieval: true,
    expectedCalls: [
      { name: "ToolSearcher", args: {"keywords":"OrganizationMembers"} },
      { name: "OrganizationMembers", args: {"organization":"ByteDance"} },
      { name: "ToolSearcher", args: {"keywords":"TravelStatus"} },
      { name: "TravelStatus", args: {"member_name":"Bob"} },
      { name: "TravelStatus", args: {"member_name":"Alice"} },
      { name: "ToolSearcher", args: {"keywords":"AddMeeting"} },
      { name: "AddMeeting", args: {"meeting_topic":"Team Meeting","start_time":"2023-06-08 14:00:00","end_time":"2023-06-08 15:00:00","location":"Conference Room A","attendees":["Alice"]} },
    ],
    mockOutputs: [
      { name: "ToolSearcher", args: {"keywords":"OrganizationMembers"}, output: {"name":"OrganizationMembers","description":"API to retrieve the list of members in the organization.","input_parameters":{"organization":{"type":"str","description":"Name of the organization."}},"output_parameters":{"members":{"type":"list","description":"List of organization members."}}} },
      { name: "OrganizationMembers", args: {"organization":"ByteDance"}, output: {"members":["Bob","Alice"]} },
      { name: "ToolSearcher", args: {"keywords":"TravelStatus"}, output: {"name":"TravelStatus","description":"API for retrieving the current travel status of each member.","input_parameters":{"member_name":{"type":"str","description":"Name of the member."}},"output_parameters":{"status":{"type":"str","description":"Travel status"}}} },
      { name: "TravelStatus", args: {"member_name":"Bob"}, output: "Traveling" },
      { name: "TravelStatus", args: {"member_name":"Alice"}, output: "Working from home" },
      { name: "ToolSearcher", args: {"keywords":"AddMeeting"}, output: {"name":"AddMeeting","description":"This API allows users to make a reservation for a meeting and store the meeting information in the database.Function：Allow users to make a reservation for a meeting.Exception Handling：1. If the reservation is successful, return a success message.2. If the reservation fails, return a corresponding error message.","input_parameters":{"meeting_topic":{"type":"str","description":"The title of the meeting, no more than 50 characters."},"start_time":{"type":"str","description":"The start time of the meeting, in the pattern of %Y-%m-%d %H:%M:%S"},"end_time":{"type":"str","description":"The end time of the meeting, in the pattern of %Y-%m-%d %H:%M:%S"},"location":{"type":"str","description":"The location where the meeting to be held, no more than 100 characters."},"attendees":{"type":"list(str)","description":"The attendees of the meeting, including names, positions and other information."}},"output_parameters":{"status":{"type":"str","description":"success or failed"}}} },
      { name: "AddMeeting", args: {"meeting_topic":"Team Meeting","start_time":"2023-06-08 14:00:00","end_time":"2023-06-08 15:00:00","location":"Conference Room A","attendees":["Alice"]}, output: "success" },
    ]
  },
  {
    id: "L3/14",
    level: 3,
    category: "Level 3 - multi-call planning",
    title: "Book a meeting for me, including all employees in the JD who are not…",
    requirement: "Book a meeting for me, including all employees in the JD who are not traveling. Today is 2023.6.8, the meeting is from 14:00 to 15:00.",
    task: "Book a meeting for me, including all employees in the JD who are not traveling. Today is 2023.6.8, the meeting is from 14:00 to 15:00.",
    toolNames: ["ToolSearcher", "OrganizationMembers", "TravelStatus", "AddMeeting"],
    requiresRetrieval: true,
    expectedCalls: [
      { name: "ToolSearcher", args: {"keywords":"OrganizationMembers"} },
      { name: "OrganizationMembers", args: {"organization":"JD"} },
      { name: "ToolSearcher", args: {"keywords":"TravelStatus"} },
      { name: "TravelStatus", args: {"member_name":"Mike"} },
      { name: "TravelStatus", args: {"member_name":"Jane"} },
      { name: "ToolSearcher", args: {"keywords":"AddMeeting"} },
      { name: "AddMeeting", args: {"meeting_topic":"Team Meeting","start_time":"2023-06-08 14:00:00","end_time":"2023-06-08 15:00:00","location":"Conference Room A","attendees":["Mike","Jane"]} },
    ],
    mockOutputs: [
      { name: "ToolSearcher", args: {"keywords":"OrganizationMembers"}, output: {"name":"OrganizationMembers","description":"API to retrieve the list of members in the organization.","input_parameters":{"organization":{"type":"str","description":"Name of the organization."}},"output_parameters":{"members":{"type":"list","description":"List of organization members."}}} },
      { name: "OrganizationMembers", args: {"organization":"JD"}, output: {"members":["Mike","Jane"]} },
      { name: "ToolSearcher", args: {"keywords":"TravelStatus"}, output: {"name":"TravelStatus","description":"API for retrieving the current travel status of each member.","input_parameters":{"member_name":{"type":"str","description":"Name of the member."}},"output_parameters":{"status":{"type":"str","description":"Travel status"}}} },
      { name: "TravelStatus", args: {"member_name":"Mike"}, output: "Working from office" },
      { name: "TravelStatus", args: {"member_name":"Jane"}, output: "Working from office" },
      { name: "ToolSearcher", args: {"keywords":"AddMeeting"}, output: {"name":"AddMeeting","description":"This API allows users to make a reservation for a meeting and store the meeting information in the database.Function：Allow users to make a reservation for a meeting.Exception Handling：1. If the reservation is successful, return a success message.2. If the reservation fails, return a corresponding error message.","input_parameters":{"meeting_topic":{"type":"str","description":"The title of the meeting, no more than 50 characters."},"start_time":{"type":"str","description":"The start time of the meeting, in the pattern of %Y-%m-%d %H:%M:%S"},"end_time":{"type":"str","description":"The end time of the meeting, in the pattern of %Y-%m-%d %H:%M:%S"},"location":{"type":"str","description":"The location where the meeting to be held, no more than 100 characters."},"attendees":{"type":"list(str)","description":"The attendees of the meeting, including names, positions and other information."}},"output_parameters":{"status":{"type":"str","description":"success or failed"}}} },
      { name: "AddMeeting", args: {"meeting_topic":"Team Meeting","start_time":"2023-06-08 14:00:00","end_time":"2023-06-08 15:00:00","location":"Conference Room A","attendees":["Mike","Jane"]}, output: "success" },
    ]
  },
  {
    id: "L3/15",
    level: 3,
    category: "Level 3 - multi-call planning",
    title: "Find nearby restaurants within 1km of New York City.",
    requirement: "Find nearby restaurants within 1km of New York City.",
    task: "Find nearby restaurants within 1km of New York City.",
    toolNames: ["ToolSearcher", "Geocoding", "NearbyRestaurants"],
    requiresRetrieval: true,
    expectedCalls: [
      { name: "ToolSearcher", args: {"keywords":"Geocoding"} },
      { name: "Geocoding", args: {"address":"New York City"} },
      { name: "ToolSearcher", args: {"keywords":"NearbyRestaurants"} },
      { name: "NearbyRestaurants", args: {"latitude":"40.7128","longitude":"74.0060","distance":"1000"} },
    ],
    mockOutputs: [
      { name: "ToolSearcher", args: {"keywords":"Geocoding"}, output: {"name":"Geocoding","description":"The API for converting an address or place name to geographical coordinates.","input_parameters":{"address":{"type":"str","description":"The address or place name to be converted."}},"output_parameters":{"latitude":{"type":"float","description":"The latitude of the location."},"longitude":{"type":"float","description":"The longitude of the location."}}} },
      { name: "Geocoding", args: {"address":"New York City"}, output: {"latitude":40.7128,"longitude":74.006} },
      { name: "ToolSearcher", args: {"keywords":"NearbyRestaurants"}, output: {"name":"NearbyRestaurants","description":"Retrieves nearby restaurants based on the provided coordinates and search parameters.","input_parameters":{"latitude":{"type":"float","description":"Latitude of the location."},"longitude":{"type":"float","description":"Longitude of the location."},"distance":{"type":"int","description":"The distance in meters from the location to search for restaurants."}},"output_parameters":{"restaurants":{"type":"list","description":"A list of nearby restaurants."}}} },
      { name: "NearbyRestaurants", args: {"latitude":"40.7128","longitude":"74.0060","distance":"1000"}, output: {"restaurants":[{"coordinates":[40.7128,74.006],"name":"Restaurant A"},{"coordinates":[37.7749,122.4194],"name":"Restaurant B"},{"coordinates":[40.7128,74.006],"name":"Restaurant C"},{"coordinates":[37.7749,122.4194],"name":"Restaurant D"}]} },
    ]
  },
  {
    id: "L3/16",
    level: 3,
    category: "Level 3 - multi-call planning",
    title: "Find nearby restaurants within 1km of San Francisco.",
    requirement: "Find nearby restaurants within 1km of San Francisco.",
    task: "Find nearby restaurants within 1km of San Francisco.",
    toolNames: ["ToolSearcher", "Geocoding", "NearbyRestaurants"],
    requiresRetrieval: true,
    expectedCalls: [
      { name: "ToolSearcher", args: {"keywords":"Geocoding"} },
      { name: "Geocoding", args: {"address":"San Francisco"} },
      { name: "ToolSearcher", args: {"keywords":"NearbyRestaurants"} },
      { name: "NearbyRestaurants", args: {"latitude":"37.7749","longitude":"122.4194","distance":"1000"} },
    ],
    mockOutputs: [
      { name: "ToolSearcher", args: {"keywords":"Geocoding"}, output: {"name":"Geocoding","description":"The API for converting an address or place name to geographical coordinates.","input_parameters":{"address":{"type":"str","description":"The address or place name to be converted."}},"output_parameters":{"latitude":{"type":"float","description":"The latitude of the location."},"longitude":{"type":"float","description":"The longitude of the location."}}} },
      { name: "Geocoding", args: {"address":"San Francisco"}, output: {"latitude":37.7749,"longitude":122.4194} },
      { name: "ToolSearcher", args: {"keywords":"NearbyRestaurants"}, output: {"name":"NearbyRestaurants","description":"Retrieves nearby restaurants based on the provided coordinates and search parameters.","input_parameters":{"latitude":{"type":"float","description":"Latitude of the location."},"longitude":{"type":"float","description":"Longitude of the location."},"distance":{"type":"int","description":"The distance in meters from the location to search for restaurants."}},"output_parameters":{"restaurants":{"type":"list","description":"A list of nearby restaurants."}}} },
      { name: "NearbyRestaurants", args: {"latitude":"37.7749","longitude":"122.4194","distance":"1000"}, output: {"restaurants":[{"coordinates":[40.7128,74.006],"name":"Restaurant A"},{"coordinates":[37.7749,122.4194],"name":"Restaurant B"},{"coordinates":[40.7128,74.006],"name":"Restaurant C"},{"coordinates":[37.7749,122.4194],"name":"Restaurant D"}]} },
    ]
  },
  {
    id: "L3/17",
    level: 3,
    category: "Level 3 - multi-call planning",
    title: "Find nearby restaurants within 1km of London.",
    requirement: "Find nearby restaurants within 1km of London.",
    task: "Find nearby restaurants within 1km of London.",
    toolNames: ["ToolSearcher", "Geocoding", "NearbyRestaurants"],
    requiresRetrieval: true,
    expectedCalls: [
      { name: "ToolSearcher", args: {"keywords":"Geocoding"} },
      { name: "Geocoding", args: {"address":"London"} },
      { name: "ToolSearcher", args: {"keywords":"NearbyRestaurants"} },
      { name: "NearbyRestaurants", args: {"latitude":"51.5074","longitude":"0.1278","distance":1000} },
    ],
    mockOutputs: [
      { name: "ToolSearcher", args: {"keywords":"Geocoding"}, output: {"name":"Geocoding","description":"The API for converting an address or place name to geographical coordinates.","input_parameters":{"address":{"type":"str","description":"The address or place name to be converted."}},"output_parameters":{"latitude":{"type":"float","description":"The latitude of the location."},"longitude":{"type":"float","description":"The longitude of the location."}}} },
      { name: "Geocoding", args: {"address":"London"}, output: {"latitude":51.5074,"longitude":0.1278} },
      { name: "ToolSearcher", args: {"keywords":"NearbyRestaurants"}, output: {"name":"NearbyRestaurants","description":"Retrieves nearby restaurants based on the provided coordinates and search parameters.","input_parameters":{"latitude":{"type":"float","description":"Latitude of the location."},"longitude":{"type":"float","description":"Longitude of the location."},"distance":{"type":"int","description":"The distance in meters from the location to search for restaurants."}},"output_parameters":{"restaurants":{"type":"list","description":"A list of nearby restaurants."}}} },
      { name: "NearbyRestaurants", args: {"latitude":"51.5074","longitude":"0.1278","distance":1000}, output: {"restaurants":[{"coordinates":[40.7128,74.006],"name":"Restaurant A"},{"coordinates":[37.7749,122.4194],"name":"Restaurant B"},{"coordinates":[40.7128,74.006],"name":"Restaurant C"},{"coordinates":[37.7749,122.4194],"name":"Restaurant D"}]} },
    ]
  },
  {
    id: "L3/18",
    level: 3,
    category: "Level 3 - multi-call planning",
    title: "Find nearby restaurants within 1km of Paris.",
    requirement: "Find nearby restaurants within 1km of Paris.",
    task: "Find nearby restaurants within 1km of Paris.",
    toolNames: ["ToolSearcher", "Geocoding", "NearbyRestaurants"],
    requiresRetrieval: true,
    expectedCalls: [
      { name: "ToolSearcher", args: {"keywords":"Geocoding"} },
      { name: "Geocoding", args: {"address":"Paris"} },
      { name: "ToolSearcher", args: {"keywords":"NearbyRestaurants"} },
      { name: "NearbyRestaurants", args: {"latitude":"48.8566","longitude":"2.3522","distance":1000} },
    ],
    mockOutputs: [
      { name: "ToolSearcher", args: {"keywords":"Geocoding"}, output: {"name":"Geocoding","description":"The API for converting an address or place name to geographical coordinates.","input_parameters":{"address":{"type":"str","description":"The address or place name to be converted."}},"output_parameters":{"latitude":{"type":"float","description":"The latitude of the location."},"longitude":{"type":"float","description":"The longitude of the location."}}} },
      { name: "Geocoding", args: {"address":"Paris"}, output: {"latitude":48.8566,"longitude":2.3522} },
      { name: "ToolSearcher", args: {"keywords":"NearbyRestaurants"}, output: {"name":"NearbyRestaurants","description":"Retrieves nearby restaurants based on the provided coordinates and search parameters.","input_parameters":{"latitude":{"type":"float","description":"Latitude of the location."},"longitude":{"type":"float","description":"Longitude of the location."},"distance":{"type":"int","description":"The distance in meters from the location to search for restaurants."}},"output_parameters":{"restaurants":{"type":"list","description":"A list of nearby restaurants."}}} },
      { name: "NearbyRestaurants", args: {"latitude":"48.8566","longitude":"2.3522","distance":1000}, output: {"restaurants":[{"coordinates":[40.7128,74.006],"name":"Restaurant A"},{"coordinates":[37.7749,122.4194],"name":"Restaurant B"},{"coordinates":[40.7128,74.006],"name":"Restaurant C"},{"coordinates":[37.7749,122.4194],"name":"Restaurant D"}]} },
    ]
  },
  {
    id: "L3/19",
    level: 3,
    category: "Level 3 - multi-call planning",
    title: "Find nearby restaurants within 1km of Tokyo.",
    requirement: "Find nearby restaurants within 1km of Tokyo.",
    task: "Find nearby restaurants within 1km of Tokyo.",
    toolNames: ["ToolSearcher", "Geocoding", "NearbyRestaurants"],
    requiresRetrieval: true,
    expectedCalls: [
      { name: "ToolSearcher", args: {"keywords":"Geocoding"} },
      { name: "Geocoding", args: {"address":"Tokyo"} },
      { name: "ToolSearcher", args: {"keywords":"NearbyRestaurants"} },
      { name: "NearbyRestaurants", args: {"latitude":"35.6762","longitude":"139.6503","distance":1000} },
    ],
    mockOutputs: [
      { name: "ToolSearcher", args: {"keywords":"Geocoding"}, output: {"name":"Geocoding","description":"The API for converting an address or place name to geographical coordinates.","input_parameters":{"address":{"type":"str","description":"The address or place name to be converted."}},"output_parameters":{"latitude":{"type":"float","description":"The latitude of the location."},"longitude":{"type":"float","description":"The longitude of the location."}}} },
      { name: "Geocoding", args: {"address":"Tokyo"}, output: {"latitude":35.6762,"longitude":139.6503} },
      { name: "ToolSearcher", args: {"keywords":"NearbyRestaurants"}, output: {"name":"NearbyRestaurants","description":"Retrieves nearby restaurants based on the provided coordinates and search parameters.","input_parameters":{"latitude":{"type":"float","description":"Latitude of the location."},"longitude":{"type":"float","description":"Longitude of the location."},"distance":{"type":"int","description":"The distance in meters from the location to search for restaurants."}},"output_parameters":{"restaurants":{"type":"list","description":"A list of nearby restaurants."}}} },
      { name: "NearbyRestaurants", args: {"latitude":"35.6762","longitude":"139.6503","distance":1000}, output: {"restaurants":[{"coordinates":[40.7128,74.006],"name":"Restaurant A"},{"coordinates":[37.7749,122.4194],"name":"Restaurant B"},{"coordinates":[40.7128,74.006],"name":"Restaurant C"},{"coordinates":[37.7749,122.4194],"name":"Restaurant D"}]} },
    ]
  },
  {
    id: "L3/20",
    level: 3,
    category: "Level 3 - multi-call planning",
    title: "Retrieve a list of recommended movies based on John's preferences and…",
    requirement: "Retrieve a list of recommended movies based on John's preferences and filter out the movies that the user has already watched.",
    task: "Retrieve a list of recommended movies based on John's preferences and filter out the movies that the user has already watched.",
    toolNames: ["ToolSearcher", "UserMoviePreferences", "UserWatchedMovies", "MovieRecommendations"],
    requiresRetrieval: true,
    expectedCalls: [
      { name: "ToolSearcher", args: {"keywords":"UserMoviePreferences"} },
      { name: "UserMoviePreferences", args: {"user_name":"John"} },
      { name: "ToolSearcher", args: {"keywords":"UserWatchedMovies"} },
      { name: "UserWatchedMovies", args: {"user_name":"John"} },
      { name: "ToolSearcher", args: {"keywords":"MovieRecommendations"} },
      { name: "MovieRecommendations", args: {"preferences":["Action","Comedy","Drama"]} },
    ],
    mockOutputs: [
      { name: "ToolSearcher", args: {"keywords":"UserMoviePreferences"}, output: {"name":"UserMoviePreferences","description":"API for retrieving user preferences for movie recommendations.","input_parameters":{"user_name":{"type":"str","description":"Name of the user."}},"output_parameters":{"preferences":{"type":"list","description":"List of movie preferences."}}} },
      { name: "UserMoviePreferences", args: {"user_name":"John"}, output: {"preferences":["Action","Comedy","Drama"]} },
      { name: "ToolSearcher", args: {"keywords":"UserWatchedMovies"}, output: {"name":"UserWatchedMovies","description":"API for retrieving a user's watched movie list.","input_parameters":{"user_name":{"type":"str","description":"Name of the user."}},"output_parameters":{"watched_movies":{"type":"list","description":"List of watched movies."}}} },
      { name: "UserWatchedMovies", args: {"user_name":"John"}, output: ["The Matrix","The Lord of the Rings","The Dark Knight"] },
      { name: "ToolSearcher", args: {"keywords":"MovieRecommendations"}, output: {"name":"MovieRecommendations","description":"The API for retrieving recommended movies based on user preferences and filtering watched movies.","input_parameters":{"preferences":{"type":"list","description":"User's movie preferences."}},"output_parameters":{"recommended_movies":{"type":"list","description":"List of recommended movies."}}} },
      { name: "MovieRecommendations", args: {"preferences":["Action","Comedy","Drama"]}, output: {"recommended_movies":["The Dark Knight","The Matrix","The Lord of the Rings","The Hangover","Knives Out","Deadpool","The Shawshank Redemption","Forrest Gump","Joker"]} },
    ]
  },
  {
    id: "L3/21",
    level: 3,
    category: "Level 3 - multi-call planning",
    title: "Retrieve a list of recommended movies based on Mary's preferences and…",
    requirement: "Retrieve a list of recommended movies based on Mary's preferences and filter out the movies that the user has already watched.",
    task: "Retrieve a list of recommended movies based on Mary's preferences and filter out the movies that the user has already watched.",
    toolNames: ["ToolSearcher", "UserMoviePreferences", "UserWatchedMovies", "MovieRecommendations"],
    requiresRetrieval: true,
    expectedCalls: [
      { name: "ToolSearcher", args: {"keywords":"UserMoviePreferences"} },
      { name: "UserMoviePreferences", args: {"user_name":"Mary"} },
      { name: "ToolSearcher", args: {"keywords":"UserWatchedMovies"} },
      { name: "UserWatchedMovies", args: {"user_name":"Mary"} },
      { name: "ToolSearcher", args: {"keywords":"MovieRecommendations"} },
      { name: "MovieRecommendations", args: {"preferences":["Comedy","Drama","Romance"]} },
    ],
    mockOutputs: [
      { name: "ToolSearcher", args: {"keywords":"UserMoviePreferences"}, output: {"name":"UserMoviePreferences","description":"API for retrieving user preferences for movie recommendations.","input_parameters":{"user_name":{"type":"str","description":"Name of the user."}},"output_parameters":{"preferences":{"type":"list","description":"List of movie preferences."}}} },
      { name: "UserMoviePreferences", args: {"user_name":"Mary"}, output: {"preferences":["Comedy","Drama","Romance"]} },
      { name: "ToolSearcher", args: {"keywords":"UserWatchedMovies"}, output: {"name":"UserWatchedMovies","description":"API for retrieving a user's watched movie list.","input_parameters":{"user_name":{"type":"str","description":"Name of the user."}},"output_parameters":{"watched_movies":{"type":"list","description":"List of watched movies."}}} },
      { name: "UserWatchedMovies", args: {"user_name":"Mary"}, output: ["The Lord of the Rings","The Dark Knight","The Matrix"] },
      { name: "ToolSearcher", args: {"keywords":"MovieRecommendations"}, output: {"name":"MovieRecommendations","description":"The API for retrieving recommended movies based on user preferences and filtering watched movies.","input_parameters":{"preferences":{"type":"list","description":"User's movie preferences."}},"output_parameters":{"recommended_movies":{"type":"list","description":"List of recommended movies."}}} },
      { name: "MovieRecommendations", args: {"preferences":["Comedy","Drama","Romance"]}, output: {"recommended_movies":["The Hangover","Knives Out","Deadpool","The Shawshank Redemption","Forrest Gump","Joker","Titanic","La La Land","The Notebook"]} },
    ]
  },
  {
    id: "L3/22",
    level: 3,
    category: "Level 3 - multi-call planning",
    title: "Retrieve a list of recommended movies based on Peter's preferences an…",
    requirement: "Retrieve a list of recommended movies based on Peter's preferences and filter out the movies that the user has already watched.",
    task: "Retrieve a list of recommended movies based on Peter's preferences and filter out the movies that the user has already watched.",
    toolNames: ["ToolSearcher", "UserMoviePreferences", "UserWatchedMovies", "MovieRecommendations"],
    requiresRetrieval: true,
    expectedCalls: [
      { name: "ToolSearcher", args: {"keywords":"UserMoviePreferences"} },
      { name: "UserMoviePreferences", args: {"user_name":"Peter"} },
      { name: "ToolSearcher", args: {"keywords":"UserWatchedMovies"} },
      { name: "UserWatchedMovies", args: {"user_name":"Peter"} },
      { name: "ToolSearcher", args: {"keywords":"MovieRecommendations"} },
      { name: "MovieRecommendations", args: {"preferences":["Action","Drama","Thriller"]} },
    ],
    mockOutputs: [
      { name: "ToolSearcher", args: {"keywords":"UserMoviePreferences"}, output: {"name":"UserMoviePreferences","description":"API for retrieving user preferences for movie recommendations.","input_parameters":{"user_name":{"type":"str","description":"Name of the user."}},"output_parameters":{"preferences":{"type":"list","description":"List of movie preferences."}}} },
      { name: "UserMoviePreferences", args: {"user_name":"Peter"}, output: {"preferences":["Action","Drama","Thriller"]} },
      { name: "ToolSearcher", args: {"keywords":"UserWatchedMovies"}, output: {"name":"UserWatchedMovies","description":"API for retrieving a user's watched movie list.","input_parameters":{"user_name":{"type":"str","description":"Name of the user."}},"output_parameters":{"watched_movies":{"type":"list","description":"List of watched movies."}}} },
      { name: "UserWatchedMovies", args: {"user_name":"Peter"}, output: ["The Matrix","The Lord of the Rings","The Dark Knight"] },
      { name: "ToolSearcher", args: {"keywords":"MovieRecommendations"}, output: {"name":"MovieRecommendations","description":"The API for retrieving recommended movies based on user preferences and filtering watched movies.","input_parameters":{"preferences":{"type":"list","description":"User's movie preferences."}},"output_parameters":{"recommended_movies":{"type":"list","description":"List of recommended movies."}}} },
      { name: "MovieRecommendations", args: {"preferences":["Action","Drama","Thriller"]}, output: {"recommended_movies":["The Dark Knight","The Matrix","The Lord of the Rings","The Shawshank Redemption","Forrest Gump","Joker","Inception","Parasite","Get Out"]} },
    ]
  },
  {
    id: "L3/23",
    level: 3,
    category: "Level 3 - multi-call planning",
    title: "Retrieve a list of recommended movies based on Tom's preferences and…",
    requirement: "Retrieve a list of recommended movies based on Tom's preferences and filter out the movies that the user has already watched.",
    task: "Retrieve a list of recommended movies based on Tom's preferences and filter out the movies that the user has already watched.",
    toolNames: ["ToolSearcher", "UserMoviePreferences", "UserWatchedMovies", "MovieRecommendations"],
    requiresRetrieval: true,
    expectedCalls: [
      { name: "ToolSearcher", args: {"keywords":"UserMoviePreferences"} },
      { name: "UserMoviePreferences", args: {"user_name":"Tom"} },
      { name: "ToolSearcher", args: {"keywords":"UserWatchedMovies"} },
      { name: "UserWatchedMovies", args: {"user_name":"Tom"} },
      { name: "ToolSearcher", args: {"keywords":"MovieRecommendations"} },
      { name: "MovieRecommendations", args: {"preferences":["Action","Comedy","Drama"]} },
    ],
    mockOutputs: [
      { name: "ToolSearcher", args: {"keywords":"UserMoviePreferences"}, output: {"name":"UserMoviePreferences","description":"API for retrieving user preferences for movie recommendations.","input_parameters":{"user_name":{"type":"str","description":"Name of the user."}},"output_parameters":{"preferences":{"type":"list","description":"List of movie preferences."}}} },
      { name: "UserMoviePreferences", args: {"user_name":"Tom"}, output: {"preferences":["Action","Comedy","Drama"]} },
      { name: "ToolSearcher", args: {"keywords":"UserWatchedMovies"}, output: {"name":"UserWatchedMovies","description":"API for retrieving a user's watched movie list.","input_parameters":{"user_name":{"type":"str","description":"Name of the user."}},"output_parameters":{"watched_movies":{"type":"list","description":"List of watched movies."}}} },
      { name: "UserWatchedMovies", args: {"user_name":"Tom"}, output: ["The Lord of the Rings","The Dark Knight","The Matrix"] },
      { name: "ToolSearcher", args: {"keywords":"MovieRecommendations"}, output: {"name":"MovieRecommendations","description":"The API for retrieving recommended movies based on user preferences and filtering watched movies.","input_parameters":{"preferences":{"type":"list","description":"User's movie preferences."}},"output_parameters":{"recommended_movies":{"type":"list","description":"List of recommended movies."}}} },
      { name: "MovieRecommendations", args: {"preferences":["Action","Comedy","Drama"]}, output: {"recommended_movies":["The Dark Knight","The Matrix","The Lord of the Rings","The Hangover","Knives Out","Deadpool","The Shawshank Redemption","Forrest Gump","Joker"]} },
    ]
  },
  {
    id: "L3/24",
    level: 3,
    category: "Level 3 - multi-call planning",
    title: "Retrieve a list of recommended movies based on Jerry's preferences an…",
    requirement: "Retrieve a list of recommended movies based on Jerry's preferences and filter out the movies that the user has already watched.",
    task: "Retrieve a list of recommended movies based on Jerry's preferences and filter out the movies that the user has already watched.",
    toolNames: ["ToolSearcher", "UserMoviePreferences", "UserWatchedMovies", "MovieRecommendations"],
    requiresRetrieval: true,
    expectedCalls: [
      { name: "ToolSearcher", args: {"keywords":"UserMoviePreferences"} },
      { name: "UserMoviePreferences", args: {"user_name":"Jerry"} },
      { name: "ToolSearcher", args: {"keywords":"UserWatchedMovies"} },
      { name: "UserWatchedMovies", args: {"user_name":"Jerry"} },
      { name: "ToolSearcher", args: {"keywords":"MovieRecommendations"} },
      { name: "MovieRecommendations", args: {"preferences":["Comedy","Drama","Romance"]} },
    ],
    mockOutputs: [
      { name: "ToolSearcher", args: {"keywords":"UserMoviePreferences"}, output: {"name":"UserMoviePreferences","description":"API for retrieving user preferences for movie recommendations.","input_parameters":{"user_name":{"type":"str","description":"Name of the user."}},"output_parameters":{"preferences":{"type":"list","description":"List of movie preferences."}}} },
      { name: "UserMoviePreferences", args: {"user_name":"Jerry"}, output: {"preferences":["Comedy","Drama","Romance"]} },
      { name: "ToolSearcher", args: {"keywords":"UserWatchedMovies"}, output: {"name":"UserWatchedMovies","description":"API for retrieving a user's watched movie list.","input_parameters":{"user_name":{"type":"str","description":"Name of the user."}},"output_parameters":{"watched_movies":{"type":"list","description":"List of watched movies."}}} },
      { name: "UserWatchedMovies", args: {"user_name":"Jerry"}, output: ["The Matrix","The Lord of the Rings","The Dark Knight"] },
      { name: "ToolSearcher", args: {"keywords":"MovieRecommendations"}, output: {"name":"MovieRecommendations","description":"The API for retrieving recommended movies based on user preferences and filtering watched movies.","input_parameters":{"preferences":{"type":"list","description":"User's movie preferences."}},"output_parameters":{"recommended_movies":{"type":"list","description":"List of recommended movies."}}} },
      { name: "MovieRecommendations", args: {"preferences":["Comedy","Drama","Romance"]}, output: {"recommended_movies":["The Hangover","Knives Out","Deadpool","The Shawshank Redemption","Forrest Gump","Joker","Titanic","La La Land","The Notebook"]} },
    ]
  },
  {
    id: "L3/25",
    level: 3,
    category: "Level 3 - multi-call planning",
    title: "Retrieve the total number of likes for a specific user ID 2 on a soci…",
    requirement: "Retrieve the total number of likes for a specific user ID 2 on a social media platform.",
    task: "Retrieve the total number of likes for a specific user ID 2 on a social media platform.",
    toolNames: ["ToolSearcher", "UserPosts", "LikeCount", "Calculator"],
    requiresRetrieval: true,
    expectedCalls: [
      { name: "ToolSearcher", args: {"keywords":"UserPosts"} },
      { name: "UserPosts", args: {"user_id":2} },
      { name: "ToolSearcher", args: {"keywords":"LikeCount"} },
      { name: "LikeCount", args: {"post_id":4} },
      { name: "LikeCount", args: {"post_id":5} },
      { name: "LikeCount", args: {"post_id":6} },
      { name: "ToolSearcher", args: {"keywords":"Calculator"} },
      { name: "Calculator", args: {"formula":"40+50+60"} },
    ],
    mockOutputs: [
      { name: "ToolSearcher", args: {"keywords":"UserPosts"}, output: {"name":"UserPosts","description":"API to retrieve the post IDs for a specific user.","input_parameters":{"user_id":{"type":"int","description":"User's ID."}},"output_parameters":{"post_ids":{"type":"list","description":"List of post IDs."}}} },
      { name: "UserPosts", args: {"user_id":2}, output: {"post_ids":[4,5,6]} },
      { name: "ToolSearcher", args: {"keywords":"LikeCount"}, output: {"name":"LikeCount","description":"API to retrieve the number of likes for a given post ID.","input_parameters":{"post_id":{"type":"int","description":"Post ID."}},"output_parameters":{"like_count":{"type":"int","description":"Number of likes for the post."}}} },
      { name: "LikeCount", args: {"post_id":4}, output: {"like_count":40} },
      { name: "LikeCount", args: {"post_id":5}, output: {"like_count":50} },
      { name: "LikeCount", args: {"post_id":6}, output: {"like_count":60} },
      { name: "ToolSearcher", args: {"keywords":"Calculator"}, output: {"name":"Calculator","description":"This API provides basic arithmetic operations: addition, subtraction, multiplication, and division.","input_parameters":{"formula":{"type":"str","description":"The formula that needs to be calculated. Only integers are supported. Valid operators are +, -, *, /, and (, ). For example, '(1 + 2) * 3'."}},"output_parameters":{"result":{"type":"float","description":"The result of the formula."}}} },
      { name: "Calculator", args: {"formula":"40+50+60"}, output: 150 },
    ]
  },
  {
    id: "L3/26",
    level: 3,
    category: "Level 3 - multi-call planning",
    title: "Retrieve the total number of likes for a specific user ID 1 on a soci…",
    requirement: "Retrieve the total number of likes for a specific user ID 1 on a social media platform.",
    task: "Retrieve the total number of likes for a specific user ID 1 on a social media platform.",
    toolNames: ["ToolSearcher", "UserPosts", "LikeCount", "Calculator"],
    requiresRetrieval: true,
    expectedCalls: [
      { name: "ToolSearcher", args: {"keywords":"UserPosts"} },
      { name: "UserPosts", args: {"user_id":1} },
      { name: "ToolSearcher", args: {"keywords":"LikeCount"} },
      { name: "LikeCount", args: {"post_id":1} },
      { name: "LikeCount", args: {"post_id":2} },
      { name: "LikeCount", args: {"post_id":3} },
      { name: "ToolSearcher", args: {"keywords":"Calculator"} },
      { name: "Calculator", args: {"formula":"(10+20+30)"} },
    ],
    mockOutputs: [
      { name: "ToolSearcher", args: {"keywords":"UserPosts"}, output: {"name":"UserPosts","description":"API to retrieve the post IDs for a specific user.","input_parameters":{"user_id":{"type":"int","description":"User's ID."}},"output_parameters":{"post_ids":{"type":"list","description":"List of post IDs."}}} },
      { name: "UserPosts", args: {"user_id":1}, output: {"post_ids":[1,2,3]} },
      { name: "ToolSearcher", args: {"keywords":"LikeCount"}, output: {"name":"LikeCount","description":"API to retrieve the number of likes for a given post ID.","input_parameters":{"post_id":{"type":"int","description":"Post ID."}},"output_parameters":{"like_count":{"type":"int","description":"Number of likes for the post."}}} },
      { name: "LikeCount", args: {"post_id":1}, output: {"like_count":10} },
      { name: "LikeCount", args: {"post_id":2}, output: {"like_count":20} },
      { name: "LikeCount", args: {"post_id":3}, output: {"like_count":30} },
      { name: "ToolSearcher", args: {"keywords":"Calculator"}, output: {"name":"Calculator","description":"This API provides basic arithmetic operations: addition, subtraction, multiplication, and division.","input_parameters":{"formula":{"type":"str","description":"The formula that needs to be calculated. Only integers are supported. Valid operators are +, -, *, /, and (, ). For example, '(1 + 2) * 3'."}},"output_parameters":{"result":{"type":"float","description":"The result of the formula."}}} },
      { name: "Calculator", args: {"formula":"(10+20+30)"}, output: 60 },
    ]
  },
  {
    id: "L3/27",
    level: 3,
    category: "Level 3 - multi-call planning",
    title: "Retrieve the total number of likes for a specific user ID 3 on a soci…",
    requirement: "Retrieve the total number of likes for a specific user ID 3 on a social media platform.",
    task: "Retrieve the total number of likes for a specific user ID 3 on a social media platform.",
    toolNames: ["ToolSearcher", "UserPosts", "LikeCount", "Calculator"],
    requiresRetrieval: true,
    expectedCalls: [
      { name: "ToolSearcher", args: {"keywords":"UserPosts"} },
      { name: "UserPosts", args: {"user_id":3} },
      { name: "ToolSearcher", args: {"keywords":"LikeCount"} },
      { name: "LikeCount", args: {"post_id":7} },
      { name: "LikeCount", args: {"post_id":8} },
      { name: "LikeCount", args: {"post_id":9} },
      { name: "ToolSearcher", args: {"keywords":"Calculator"} },
      { name: "Calculator", args: {"formula":"30 / 3"} },
    ],
    mockOutputs: [
      { name: "ToolSearcher", args: {"keywords":"UserPosts"}, output: {"name":"UserPosts","description":"API to retrieve the post IDs for a specific user.","input_parameters":{"user_id":{"type":"int","description":"User's ID."}},"output_parameters":{"post_ids":{"type":"list","description":"List of post IDs."}}} },
      { name: "UserPosts", args: {"user_id":3}, output: {"post_ids":[7,8,9]} },
      { name: "ToolSearcher", args: {"keywords":"LikeCount"}, output: {"name":"LikeCount","description":"API to retrieve the number of likes for a given post ID.","input_parameters":{"post_id":{"type":"int","description":"Post ID."}},"output_parameters":{"like_count":{"type":"int","description":"Number of likes for the post."}}} },
      { name: "LikeCount", args: {"post_id":7}, output: {"like_count":70} },
      { name: "LikeCount", args: {"post_id":8}, output: {"like_count":80} },
      { name: "LikeCount", args: {"post_id":9}, output: {"like_count":90} },
      { name: "ToolSearcher", args: {"keywords":"Calculator"}, output: {"name":"Calculator","description":"This API provides basic arithmetic operations: addition, subtraction, multiplication, and division.","input_parameters":{"formula":{"type":"str","description":"The formula that needs to be calculated. Only integers are supported. Valid operators are +, -, *, /, and (, ). For example, '(1 + 2) * 3'."}},"output_parameters":{"result":{"type":"float","description":"The result of the formula."}}} },
      { name: "Calculator", args: {"formula":"30 / 3"}, output: 10 },
    ]
  },
  {
    id: "L3/28",
    level: 3,
    category: "Level 3 - multi-call planning",
    title: "Retrieve the total number of likes for a specific user ID 4 on a soci…",
    requirement: "Retrieve the total number of likes for a specific user ID 4 on a social media platform.",
    task: "Retrieve the total number of likes for a specific user ID 4 on a social media platform.",
    toolNames: ["ToolSearcher", "UserPosts", "LikeCount"],
    requiresRetrieval: true,
    expectedCalls: [
      { name: "ToolSearcher", args: {"keywords":"UserPosts"} },
      { name: "UserPosts", args: {"user_id":4} },
      { name: "ToolSearcher", args: {"keywords":"LikeCount"} },
      { name: "LikeCount", args: {"post_id":10} },
      { name: "LikeCount", args: {"post_id":11} },
      { name: "LikeCount", args: {"post_id":12} },
    ],
    mockOutputs: [
      { name: "ToolSearcher", args: {"keywords":"UserPosts"}, output: {"name":"UserPosts","description":"API to retrieve the post IDs for a specific user.","input_parameters":{"user_id":{"type":"int","description":"User's ID."}},"output_parameters":{"post_ids":{"type":"list","description":"List of post IDs."}}} },
      { name: "UserPosts", args: {"user_id":4}, output: {"post_ids":[10,11,12]} },
      { name: "ToolSearcher", args: {"keywords":"LikeCount"}, output: {"name":"LikeCount","description":"API to retrieve the number of likes for a given post ID.","input_parameters":{"post_id":{"type":"int","description":"Post ID."}},"output_parameters":{"like_count":{"type":"int","description":"Number of likes for the post."}}} },
      { name: "LikeCount", args: {"post_id":10}, output: {"like_count":100} },
      { name: "LikeCount", args: {"post_id":11}, output: {"like_count":110} },
      { name: "LikeCount", args: {"post_id":12}, output: {"like_count":120} },
    ]
  },
  {
    id: "L3/29",
    level: 3,
    category: "Level 3 - multi-call planning",
    title: "Retrieve the total number of likes for a specific user ID 5 on a soci…",
    requirement: "Retrieve the total number of likes for a specific user ID 5 on a social media platform.",
    task: "Retrieve the total number of likes for a specific user ID 5 on a social media platform.",
    toolNames: ["ToolSearcher", "UserPosts", "LikeCount", "Calculator"],
    requiresRetrieval: true,
    expectedCalls: [
      { name: "ToolSearcher", args: {"keywords":"UserPosts"} },
      { name: "UserPosts", args: {"user_id":5} },
      { name: "ToolSearcher", args: {"keywords":"LikeCount"} },
      { name: "LikeCount", args: {"post_id":13} },
      { name: "LikeCount", args: {"post_id":14} },
      { name: "LikeCount", args: {"post_id":15} },
      { name: "ToolSearcher", args: {"keywords":"Calculator"} },
      { name: "Calculator", args: {"formula":"130+140+150"} },
    ],
    mockOutputs: [
      { name: "ToolSearcher", args: {"keywords":"UserPosts"}, output: {"name":"UserPosts","description":"API to retrieve the post IDs for a specific user.","input_parameters":{"user_id":{"type":"int","description":"User's ID."}},"output_parameters":{"post_ids":{"type":"list","description":"List of post IDs."}}} },
      { name: "UserPosts", args: {"user_id":5}, output: {"post_ids":[13,14,15]} },
      { name: "ToolSearcher", args: {"keywords":"LikeCount"}, output: {"name":"LikeCount","description":"API to retrieve the number of likes for a given post ID.","input_parameters":{"post_id":{"type":"int","description":"Post ID."}},"output_parameters":{"like_count":{"type":"int","description":"Number of likes for the post."}}} },
      { name: "LikeCount", args: {"post_id":13}, output: {"like_count":130} },
      { name: "LikeCount", args: {"post_id":14}, output: {"like_count":140} },
      { name: "LikeCount", args: {"post_id":15}, output: {"like_count":150} },
      { name: "ToolSearcher", args: {"keywords":"Calculator"}, output: {"name":"Calculator","description":"This API provides basic arithmetic operations: addition, subtraction, multiplication, and division.","input_parameters":{"formula":{"type":"str","description":"The formula that needs to be calculated. Only integers are supported. Valid operators are +, -, *, /, and (, ). For example, '(1 + 2) * 3'."}},"output_parameters":{"result":{"type":"float","description":"The result of the formula."}}} },
      { name: "Calculator", args: {"formula":"130+140+150"}, output: 420 },
    ]
  },
  {
    id: "L3/30",
    level: 3,
    category: "Level 3 - multi-call planning",
    title: "Check the current weather conditions in New York City.",
    requirement: "Check the current weather conditions in New York City.",
    task: "Check the current weather conditions in New York City.",
    toolNames: ["ToolSearcher", "Geocoding", "GetWeatherForCoordinates"],
    requiresRetrieval: true,
    expectedCalls: [
      { name: "ToolSearcher", args: {"keywords":"Geocoding"} },
      { name: "Geocoding", args: {"address":"New York City"} },
      { name: "ToolSearcher", args: {"keywords":"GetWeatherForCoordinates"} },
      { name: "GetWeatherForCoordinates", args: {"latitude":"40.7128","longitude":"74.0060"} },
    ],
    mockOutputs: [
      { name: "ToolSearcher", args: {"keywords":"Geocoding"}, output: {"name":"Geocoding","description":"The API for converting an address or place name to geographical coordinates.","input_parameters":{"address":{"type":"str","description":"The address or place name to be converted."}},"output_parameters":{"latitude":{"type":"float","description":"The latitude of the location."},"longitude":{"type":"float","description":"The longitude of the location."}}} },
      { name: "Geocoding", args: {"address":"New York City"}, output: {"latitude":40.7128,"longitude":74.006} },
      { name: "ToolSearcher", args: {"keywords":"GetWeatherForCoordinates"}, output: {"name":"GetWeatherForCoordinates","description":"Retrieves current weather information based on the provided coordinates.","input_parameters":{"latitude":{"type":"float","description":"Latitude of the location."},"longitude":{"type":"float","description":"Longitude of the location."}},"output_parameters":{"temperature":{"type":"float","description":"Current temperature in Celsius."},"humidity":{"type":"float","description":"Current humidity level."},"description":{"type":"str","description":"Weather description."}}} },
      { name: "GetWeatherForCoordinates", args: {"latitude":"40.7128","longitude":"74.0060"}, output: {"temperature":10,"humidity":0.5,"description":"Clear"} },
    ]
  },
  {
    id: "L3/31",
    level: 3,
    category: "Level 3 - multi-call planning",
    title: "Check the current weather conditions in San Francisco.",
    requirement: "Check the current weather conditions in San Francisco.",
    task: "Check the current weather conditions in San Francisco.",
    toolNames: ["ToolSearcher", "Geocoding", "GetWeatherForCoordinates"],
    requiresRetrieval: true,
    expectedCalls: [
      { name: "ToolSearcher", args: {"keywords":"Geocoding"} },
      { name: "Geocoding", args: {"address":"San Francisco"} },
      { name: "ToolSearcher", args: {"keywords":"GetWeatherForCoordinates"} },
      { name: "GetWeatherForCoordinates", args: {"latitude":"37.7749","longitude":"122.4194"} },
    ],
    mockOutputs: [
      { name: "ToolSearcher", args: {"keywords":"Geocoding"}, output: {"name":"Geocoding","description":"The API for converting an address or place name to geographical coordinates.","input_parameters":{"address":{"type":"str","description":"The address or place name to be converted."}},"output_parameters":{"latitude":{"type":"float","description":"The latitude of the location."},"longitude":{"type":"float","description":"The longitude of the location."}}} },
      { name: "Geocoding", args: {"address":"San Francisco"}, output: {"latitude":37.7749,"longitude":122.4194} },
      { name: "ToolSearcher", args: {"keywords":"GetWeatherForCoordinates"}, output: {"name":"GetWeatherForCoordinates","description":"Retrieves current weather information based on the provided coordinates.","input_parameters":{"latitude":{"type":"float","description":"Latitude of the location."},"longitude":{"type":"float","description":"Longitude of the location."}},"output_parameters":{"temperature":{"type":"float","description":"Current temperature in Celsius."},"humidity":{"type":"float","description":"Current humidity level."},"description":{"type":"str","description":"Weather description."}}} },
      { name: "GetWeatherForCoordinates", args: {"latitude":"37.7749","longitude":"122.4194"}, output: {"temperature":20,"humidity":0.8,"description":"Cloudy"} },
    ]
  },
  {
    id: "L3/32",
    level: 3,
    category: "Level 3 - multi-call planning",
    title: "Check the current weather conditions in London.",
    requirement: "Check the current weather conditions in London.",
    task: "Check the current weather conditions in London.",
    toolNames: ["ToolSearcher", "Geocoding", "GetWeatherForCoordinates"],
    requiresRetrieval: true,
    expectedCalls: [
      { name: "ToolSearcher", args: {"keywords":"Geocoding"} },
      { name: "Geocoding", args: {"address":"London"} },
      { name: "ToolSearcher", args: {"keywords":"GetWeatherForCoordinates"} },
      { name: "GetWeatherForCoordinates", args: {"latitude":"51.5074","longitude":"0.1278"} },
    ],
    mockOutputs: [
      { name: "ToolSearcher", args: {"keywords":"Geocoding"}, output: {"name":"Geocoding","description":"The API for converting an address or place name to geographical coordinates.","input_parameters":{"address":{"type":"str","description":"The address or place name to be converted."}},"output_parameters":{"latitude":{"type":"float","description":"The latitude of the location."},"longitude":{"type":"float","description":"The longitude of the location."}}} },
      { name: "Geocoding", args: {"address":"London"}, output: {"latitude":51.5074,"longitude":0.1278} },
      { name: "ToolSearcher", args: {"keywords":"GetWeatherForCoordinates"}, output: {"name":"GetWeatherForCoordinates","description":"Retrieves current weather information based on the provided coordinates.","input_parameters":{"latitude":{"type":"float","description":"Latitude of the location."},"longitude":{"type":"float","description":"Longitude of the location."}},"output_parameters":{"temperature":{"type":"float","description":"Current temperature in Celsius."},"humidity":{"type":"float","description":"Current humidity level."},"description":{"type":"str","description":"Weather description."}}} },
      { name: "GetWeatherForCoordinates", args: {"latitude":"51.5074","longitude":"0.1278"}, output: {"temperature":5,"humidity":0.9,"description":"Rainy"} },
    ]
  },
  {
    id: "L3/33",
    level: 3,
    category: "Level 3 - multi-call planning",
    title: "Check the current weather conditions in Paris.",
    requirement: "Check the current weather conditions in Paris.",
    task: "Check the current weather conditions in Paris.",
    toolNames: ["ToolSearcher", "Geocoding", "GetWeatherForCoordinates"],
    requiresRetrieval: true,
    expectedCalls: [
      { name: "ToolSearcher", args: {"keywords":"Geocoding"} },
      { name: "Geocoding", args: {"address":"Paris"} },
      { name: "ToolSearcher", args: {"keywords":"GetWeatherForCoordinates"} },
      { name: "GetWeatherForCoordinates", args: {"latitude":"48.8566","longitude":"2.3522"} },
    ],
    mockOutputs: [
      { name: "ToolSearcher", args: {"keywords":"Geocoding"}, output: {"name":"Geocoding","description":"The API for converting an address or place name to geographical coordinates.","input_parameters":{"address":{"type":"str","description":"The address or place name to be converted."}},"output_parameters":{"latitude":{"type":"float","description":"The latitude of the location."},"longitude":{"type":"float","description":"The longitude of the location."}}} },
      { name: "Geocoding", args: {"address":"Paris"}, output: {"latitude":48.8566,"longitude":2.3522} },
      { name: "ToolSearcher", args: {"keywords":"GetWeatherForCoordinates"}, output: {"name":"GetWeatherForCoordinates","description":"Retrieves current weather information based on the provided coordinates.","input_parameters":{"latitude":{"type":"float","description":"Latitude of the location."},"longitude":{"type":"float","description":"Longitude of the location."}},"output_parameters":{"temperature":{"type":"float","description":"Current temperature in Celsius."},"humidity":{"type":"float","description":"Current humidity level."},"description":{"type":"str","description":"Weather description."}}} },
      { name: "GetWeatherForCoordinates", args: {"latitude":"48.8566","longitude":"2.3522"}, output: {"temperature":15,"humidity":0.7,"description":"Sunny"} },
    ]
  },
  {
    id: "L3/34",
    level: 3,
    category: "Level 3 - multi-call planning",
    title: "Check the current weather conditions in Tokyo.",
    requirement: "Check the current weather conditions in Tokyo.",
    task: "Check the current weather conditions in Tokyo.",
    toolNames: ["ToolSearcher", "Geocoding", "GetWeatherForCoordinates"],
    requiresRetrieval: true,
    expectedCalls: [
      { name: "ToolSearcher", args: {"keywords":"Geocoding"} },
      { name: "Geocoding", args: {"address":"Tokyo"} },
      { name: "ToolSearcher", args: {"keywords":"GetWeatherForCoordinates"} },
      { name: "GetWeatherForCoordinates", args: {"latitude":"35.6762","longitude":"139.6503"} },
    ],
    mockOutputs: [
      { name: "ToolSearcher", args: {"keywords":"Geocoding"}, output: {"name":"Geocoding","description":"The API for converting an address or place name to geographical coordinates.","input_parameters":{"address":{"type":"str","description":"The address or place name to be converted."}},"output_parameters":{"latitude":{"type":"float","description":"The latitude of the location."},"longitude":{"type":"float","description":"The longitude of the location."}}} },
      { name: "Geocoding", args: {"address":"Tokyo"}, output: {"latitude":35.6762,"longitude":139.6503} },
      { name: "ToolSearcher", args: {"keywords":"GetWeatherForCoordinates"}, output: {"name":"GetWeatherForCoordinates","description":"Retrieves current weather information based on the provided coordinates.","input_parameters":{"latitude":{"type":"float","description":"Latitude of the location."},"longitude":{"type":"float","description":"Longitude of the location."}},"output_parameters":{"temperature":{"type":"float","description":"Current temperature in Celsius."},"humidity":{"type":"float","description":"Current humidity level."},"description":{"type":"str","description":"Weather description."}}} },
      { name: "GetWeatherForCoordinates", args: {"latitude":"35.6762","longitude":"139.6503"}, output: {"temperature":25,"humidity":0.6,"description":"Rainy"} },
    ]
  },
  {
    id: "L3/35",
    level: 3,
    category: "Level 3 - multi-call planning",
    title: "Retrieve flight options and hotel availability for a given destinatio…",
    requirement: "Retrieve flight options and hotel availability for a given destination and travel dates.",
    task: "Retrieve flight options and hotel availability for a given destination and travel dates.",
    toolNames: ["ToolSearcher", "FlightSearch", "HotelAvailability"],
    requiresRetrieval: true,
    expectedCalls: [
      { name: "ToolSearcher", args: {"keywords":"FlightSearch"} },
      { name: "FlightSearch", args: {"source":"New York","destination":"San Francisco","travel_dates":"2022-01-01"} },
      { name: "ToolSearcher", args: {"keywords":"HotelAvailability"} },
      { name: "HotelAvailability", args: {"destination":"San Francisco","check_in_date":"2022-01-01","check_out_date":"2022-01-02"} },
    ],
    mockOutputs: [
      { name: "ToolSearcher", args: {"keywords":"FlightSearch"}, output: {"name":"FlightSearch","description":"API to retrieve flight options based on the destination and travel dates.","input_parameters":{"source":{"type":"str","description":"Source for the flight."},"destination":{"type":"str","description":"Destination for the flight."},"travel_dates":{"type":"str","description":"Travel dates. Format: %Y-%m-%d"}},"output_parameters":{"flights":{"type":"list","description":"List of available flight options."}}} },
      { name: "FlightSearch", args: {"source":"New York","destination":"San Francisco","travel_dates":"2022-01-01"}, output: {"flights":[{"source":"New York","destination":"San Francisco","departure_date":"2022-01-01 12:00:00","arrival_date":"2022-01-01 15:00:00"}]} },
      { name: "ToolSearcher", args: {"keywords":"HotelAvailability"}, output: {"name":"HotelAvailability","description":"API for checking hotel availability based on the destination and travel dates.","input_parameters":{"destination":{"type":"str","description":"Destination for hotel search."},"check_in_date":{"type":"str","description":"Check-in date. Format: %Y-%m-%d"},"check_out_date":{"type":"str","description":"Check-out date. Format: %Y-%m-%d"}},"output_parameters":{"hotels":{"type":"list","description":"List of available hotels."}}} },
      { name: "HotelAvailability", args: {"destination":"San Francisco","check_in_date":"2022-01-01","check_out_date":"2022-01-02"}, output: {"hotels":[{"destination":"San Francisco","check_in_date":"2022-01-01","check_out_date":"2022-01-02"}]} },
    ]
  },
  {
    id: "L3/36",
    level: 3,
    category: "Level 3 - multi-call planning",
    title: "Retrieve flight options and hotel availability for Los Angeles to San…",
    requirement: "Retrieve flight options and hotel availability for Los Angeles to San Francisco January 2nd, 2022.",
    task: "Retrieve flight options and hotel availability for Los Angeles to San Francisco January 2nd, 2022.",
    toolNames: ["ToolSearcher", "FlightSearch", "HotelAvailability"],
    requiresRetrieval: true,
    expectedCalls: [
      { name: "ToolSearcher", args: {"keywords":"FlightSearch"} },
      { name: "FlightSearch", args: {"source":"Los Angeles","destination":"San Francisco","travel_dates":"2022-01-02"} },
      { name: "ToolSearcher", args: {"keywords":"HotelAvailability"} },
      { name: "HotelAvailability", args: {"destination":"San Francisco","check_in_date":"2022-01-02","check_out_date":"2022-01-03"} },
    ],
    mockOutputs: [
      { name: "ToolSearcher", args: {"keywords":"FlightSearch"}, output: {"name":"FlightSearch","description":"API to retrieve flight options based on the destination and travel dates.","input_parameters":{"source":{"type":"str","description":"Source for the flight."},"destination":{"type":"str","description":"Destination for the flight."},"travel_dates":{"type":"str","description":"Travel dates. Format: %Y-%m-%d"}},"output_parameters":{"flights":{"type":"list","description":"List of available flight options."}}} },
      { name: "FlightSearch", args: {"source":"Los Angeles","destination":"San Francisco","travel_dates":"2022-01-02"}, output: {"flights":[{"source":"Los Angeles","destination":"San Francisco","departure_date":"2022-01-02 12:00:00","arrival_date":"2022-01-02 15:00:00"}]} },
      { name: "ToolSearcher", args: {"keywords":"HotelAvailability"}, output: {"name":"HotelAvailability","description":"API for checking hotel availability based on the destination and travel dates.","input_parameters":{"destination":{"type":"str","description":"Destination for hotel search."},"check_in_date":{"type":"str","description":"Check-in date. Format: %Y-%m-%d"},"check_out_date":{"type":"str","description":"Check-out date. Format: %Y-%m-%d"}},"output_parameters":{"hotels":{"type":"list","description":"List of available hotels."}}} },
      { name: "HotelAvailability", args: {"destination":"San Francisco","check_in_date":"2022-01-02","check_out_date":"2022-01-03"}, output: {"hotels":[{"destination":"San Francisco","check_in_date":"2022-01-02","check_out_date":"2022-01-03"}]} },
    ]
  },
  {
    id: "L3/37",
    level: 3,
    category: "Level 3 - multi-call planning",
    title: "Retrieve flight options and hotel availability for London to San Fran…",
    requirement: "Retrieve flight options and hotel availability for London to San Francisco on January 3rd, 2022.",
    task: "Retrieve flight options and hotel availability for London to San Francisco on January 3rd, 2022.",
    toolNames: ["ToolSearcher", "FlightSearch", "HotelAvailability"],
    requiresRetrieval: true,
    expectedCalls: [
      { name: "ToolSearcher", args: {"keywords":"FlightSearch"} },
      { name: "FlightSearch", args: {"source":"London","destination":"San Francisco","travel_dates":"2022-01-03"} },
      { name: "ToolSearcher", args: {"keywords":"HotelAvailability"} },
      { name: "HotelAvailability", args: {"destination":"San Francisco","check_in_date":"2022-01-03","check_out_date":"2022-01-04"} },
    ],
    mockOutputs: [
      { name: "ToolSearcher", args: {"keywords":"FlightSearch"}, output: {"name":"FlightSearch","description":"API to retrieve flight options based on the destination and travel dates.","input_parameters":{"source":{"type":"str","description":"Source for the flight."},"destination":{"type":"str","description":"Destination for the flight."},"travel_dates":{"type":"str","description":"Travel dates. Format: %Y-%m-%d"}},"output_parameters":{"flights":{"type":"list","description":"List of available flight options."}}} },
      { name: "FlightSearch", args: {"source":"London","destination":"San Francisco","travel_dates":"2022-01-03"}, output: {"flights":[{"source":"London","destination":"San Francisco","departure_date":"2022-01-03 12:00:00","arrival_date":"2022-01-03 15:00:00"}]} },
      { name: "ToolSearcher", args: {"keywords":"HotelAvailability"}, output: {"name":"HotelAvailability","description":"API for checking hotel availability based on the destination and travel dates.","input_parameters":{"destination":{"type":"str","description":"Destination for hotel search."},"check_in_date":{"type":"str","description":"Check-in date. Format: %Y-%m-%d"},"check_out_date":{"type":"str","description":"Check-out date. Format: %Y-%m-%d"}},"output_parameters":{"hotels":{"type":"list","description":"List of available hotels."}}} },
      { name: "HotelAvailability", args: {"destination":"San Francisco","check_in_date":"2022-01-03","check_out_date":"2022-01-04"}, output: {"hotels":[{"destination":"San Francisco","check_in_date":"2022-01-03","check_out_date":"2022-01-04"}]} },
    ]
  },
  {
    id: "L3/38",
    level: 3,
    category: "Level 3 - multi-call planning",
    title: "Retrieve flight options and hotel availability for New York to London…",
    requirement: "Retrieve flight options and hotel availability for New York to London on January 4th, 2022.",
    task: "Retrieve flight options and hotel availability for New York to London on January 4th, 2022.",
    toolNames: ["ToolSearcher", "FlightSearch", "HotelAvailability"],
    requiresRetrieval: true,
    expectedCalls: [
      { name: "ToolSearcher", args: {"keywords":"FlightSearch"} },
      { name: "FlightSearch", args: {"source":"New York","destination":"London","travel_dates":"2022-01-04"} },
      { name: "ToolSearcher", args: {"keywords":"HotelAvailability"} },
      { name: "HotelAvailability", args: {"destination":"London","check_in_date":"2022-01-04","check_out_date":"2022-01-05"} },
    ],
    mockOutputs: [
      { name: "ToolSearcher", args: {"keywords":"FlightSearch"}, output: {"name":"FlightSearch","description":"API to retrieve flight options based on the destination and travel dates.","input_parameters":{"source":{"type":"str","description":"Source for the flight."},"destination":{"type":"str","description":"Destination for the flight."},"travel_dates":{"type":"str","description":"Travel dates. Format: %Y-%m-%d"}},"output_parameters":{"flights":{"type":"list","description":"List of available flight options."}}} },
      { name: "FlightSearch", args: {"source":"New York","destination":"London","travel_dates":"2022-01-04"}, output: {"flights":[{"source":"New York","destination":"London","departure_date":"2022-01-04 12:00:00","arrival_date":"2022-01-04 15:00:00"}]} },
      { name: "ToolSearcher", args: {"keywords":"HotelAvailability"}, output: {"name":"HotelAvailability","description":"API for checking hotel availability based on the destination and travel dates.","input_parameters":{"destination":{"type":"str","description":"Destination for hotel search."},"check_in_date":{"type":"str","description":"Check-in date. Format: %Y-%m-%d"},"check_out_date":{"type":"str","description":"Check-out date. Format: %Y-%m-%d"}},"output_parameters":{"hotels":{"type":"list","description":"List of available hotels."}}} },
      { name: "HotelAvailability", args: {"destination":"London","check_in_date":"2022-01-04","check_out_date":"2022-01-05"}, output: {"hotels":[]} },
    ]
  },
  {
    id: "L3/39",
    level: 3,
    category: "Level 3 - multi-call planning",
    title: "Retrieve flight options and hotel availability for New York to Los An…",
    requirement: "Retrieve flight options and hotel availability for New York to Los Angeles on January 5th, 2022.",
    task: "Retrieve flight options and hotel availability for New York to Los Angeles on January 5th, 2022.",
    toolNames: ["ToolSearcher", "FlightSearch", "HotelAvailability"],
    requiresRetrieval: true,
    expectedCalls: [
      { name: "ToolSearcher", args: {"keywords":"FlightSearch"} },
      { name: "FlightSearch", args: {"source":"New York","destination":"Los Angeles","travel_dates":"2022-01-05"} },
      { name: "ToolSearcher", args: {"keywords":"HotelAvailability"} },
      { name: "HotelAvailability", args: {"destination":"Los Angeles","check_in_date":"2022-01-05","check_out_date":"2022-01-06"} },
    ],
    mockOutputs: [
      { name: "ToolSearcher", args: {"keywords":"FlightSearch"}, output: {"name":"FlightSearch","description":"API to retrieve flight options based on the destination and travel dates.","input_parameters":{"source":{"type":"str","description":"Source for the flight."},"destination":{"type":"str","description":"Destination for the flight."},"travel_dates":{"type":"str","description":"Travel dates. Format: %Y-%m-%d"}},"output_parameters":{"flights":{"type":"list","description":"List of available flight options."}}} },
      { name: "FlightSearch", args: {"source":"New York","destination":"Los Angeles","travel_dates":"2022-01-05"}, output: {"flights":[{"source":"New York","destination":"Los Angeles","departure_date":"2022-01-05 12:00:00","arrival_date":"2022-01-05 15:00:00"}]} },
      { name: "ToolSearcher", args: {"keywords":"HotelAvailability"}, output: {"name":"HotelAvailability","description":"API for checking hotel availability based on the destination and travel dates.","input_parameters":{"destination":{"type":"str","description":"Destination for hotel search."},"check_in_date":{"type":"str","description":"Check-in date. Format: %Y-%m-%d"},"check_out_date":{"type":"str","description":"Check-out date. Format: %Y-%m-%d"}},"output_parameters":{"hotels":{"type":"list","description":"List of available hotels."}}} },
      { name: "HotelAvailability", args: {"destination":"Los Angeles","check_in_date":"2022-01-05","check_out_date":"2022-01-06"}, output: {"hotels":[]} },
    ]
  },
  {
    id: "L3/40",
    level: 3,
    category: "Level 3 - multi-call planning",
    title: "Calculate the monthly salary after taxes for a Financial Analyst",
    requirement: "Calculate the monthly salary after taxes for a Financial Analyst",
    task: "Calculate the monthly salary after taxes for a Financial Analyst",
    toolNames: ["ToolSearcher", "GetOccupationSalary", "TaxCalculator"],
    requiresRetrieval: true,
    expectedCalls: [
      { name: "ToolSearcher", args: {"keywords":"GetOccupationSalary"} },
      { name: "GetOccupationSalary", args: {"occupation":"Financial Analyst"} },
      { name: "ToolSearcher", args: {"keywords":"TaxCalculator"} },
      { name: "TaxCalculator", args: {"salary":"100000"} },
    ],
    mockOutputs: [
      { name: "ToolSearcher", args: {"keywords":"GetOccupationSalary"}, output: {"name":"GetOccupationSalary","description":"API for querying the salary of a given occupation.","input_parameters":{"occupation":{"type":"str","description":"The occupation to query."}},"output_parameters":{"salary":{"type":"float","description":"The salary of the given occupation."}}} },
      { name: "GetOccupationSalary", args: {"occupation":"Financial Analyst"}, output: {"salary":100000} },
      { name: "ToolSearcher", args: {"keywords":"TaxCalculator"}, output: {"name":"TaxCalculator","description":"API for calculating tax deductions based on the given salary.","input_parameters":{"salary":{"type":"float","description":"The salary to calculate tax deductions for."}},"output_parameters":{"salary_after_tax":{"type":"float","description":"The salary after tax deductions."}}} },
      { name: "TaxCalculator", args: {"salary":"100000"}, output: {"salary_after_tax":70000} },
    ]
  },
  {
    id: "L3/41",
    level: 3,
    category: "Level 3 - multi-call planning",
    title: "Calculate the monthly salary after taxes for a Software Engineer",
    requirement: "Calculate the monthly salary after taxes for a Software Engineer",
    task: "Calculate the monthly salary after taxes for a Software Engineer",
    toolNames: ["ToolSearcher", "GetOccupationSalary", "TaxCalculator"],
    requiresRetrieval: true,
    expectedCalls: [
      { name: "ToolSearcher", args: {"keywords":"GetOccupationSalary"} },
      { name: "GetOccupationSalary", args: {"occupation":"Software Engineer"} },
      { name: "ToolSearcher", args: {"keywords":"TaxCalculator"} },
      { name: "TaxCalculator", args: {"salary":"120000"} },
    ],
    mockOutputs: [
      { name: "ToolSearcher", args: {"keywords":"GetOccupationSalary"}, output: {"name":"GetOccupationSalary","description":"API for querying the salary of a given occupation.","input_parameters":{"occupation":{"type":"str","description":"The occupation to query."}},"output_parameters":{"salary":{"type":"float","description":"The salary of the given occupation."}}} },
      { name: "GetOccupationSalary", args: {"occupation":"Software Engineer"}, output: {"salary":120000} },
      { name: "ToolSearcher", args: {"keywords":"TaxCalculator"}, output: {"name":"TaxCalculator","description":"API for calculating tax deductions based on the given salary.","input_parameters":{"salary":{"type":"float","description":"The salary to calculate tax deductions for."}},"output_parameters":{"salary_after_tax":{"type":"float","description":"The salary after tax deductions."}}} },
      { name: "TaxCalculator", args: {"salary":"120000"}, output: {"salary_after_tax":84000} },
    ]
  },
  {
    id: "L3/42",
    level: 3,
    category: "Level 3 - multi-call planning",
    title: "Calculate the monthly salary after taxes for a Data Scientist",
    requirement: "Calculate the monthly salary after taxes for a Data Scientist",
    task: "Calculate the monthly salary after taxes for a Data Scientist",
    toolNames: ["ToolSearcher", "GetOccupationSalary", "TaxCalculator"],
    requiresRetrieval: true,
    expectedCalls: [
      { name: "ToolSearcher", args: {"keywords":"GetOccupationSalary"} },
      { name: "GetOccupationSalary", args: {"occupation":"Data Scientist"} },
      { name: "ToolSearcher", args: {"keywords":"TaxCalculator"} },
      { name: "TaxCalculator", args: {"salary":"150000"} },
    ],
    mockOutputs: [
      { name: "ToolSearcher", args: {"keywords":"GetOccupationSalary"}, output: {"name":"GetOccupationSalary","description":"API for querying the salary of a given occupation.","input_parameters":{"occupation":{"type":"str","description":"The occupation to query."}},"output_parameters":{"salary":{"type":"float","description":"The salary of the given occupation."}}} },
      { name: "GetOccupationSalary", args: {"occupation":"Data Scientist"}, output: {"salary":150000} },
      { name: "ToolSearcher", args: {"keywords":"TaxCalculator"}, output: {"name":"TaxCalculator","description":"API for calculating tax deductions based on the given salary.","input_parameters":{"salary":{"type":"float","description":"The salary to calculate tax deductions for."}},"output_parameters":{"salary_after_tax":{"type":"float","description":"The salary after tax deductions."}}} },
      { name: "TaxCalculator", args: {"salary":"150000"}, output: {"salary_after_tax":105000} },
    ]
  },
  {
    id: "L3/43",
    level: 3,
    category: "Level 3 - multi-call planning",
    title: "Calculate the monthly salary after taxes for a Product Manager",
    requirement: "Calculate the monthly salary after taxes for a Product Manager",
    task: "Calculate the monthly salary after taxes for a Product Manager",
    toolNames: ["ToolSearcher", "GetOccupationSalary", "TaxCalculator"],
    requiresRetrieval: true,
    expectedCalls: [
      { name: "ToolSearcher", args: {"keywords":"GetOccupationSalary"} },
      { name: "GetOccupationSalary", args: {"occupation":"Product Manager"} },
      { name: "ToolSearcher", args: {"keywords":"TaxCalculator"} },
      { name: "TaxCalculator", args: {"salary":130000} },
    ],
    mockOutputs: [
      { name: "ToolSearcher", args: {"keywords":"GetOccupationSalary"}, output: {"name":"GetOccupationSalary","description":"API for querying the salary of a given occupation.","input_parameters":{"occupation":{"type":"str","description":"The occupation to query."}},"output_parameters":{"salary":{"type":"float","description":"The salary of the given occupation."}}} },
      { name: "GetOccupationSalary", args: {"occupation":"Product Manager"}, output: {"salary":130000} },
      { name: "ToolSearcher", args: {"keywords":"TaxCalculator"}, output: {"name":"TaxCalculator","description":"API for calculating tax deductions based on the given salary.","input_parameters":{"salary":{"type":"float","description":"The salary to calculate tax deductions for."}},"output_parameters":{"salary_after_tax":{"type":"float","description":"The salary after tax deductions."}}} },
      { name: "TaxCalculator", args: {"salary":130000}, output: {"salary_after_tax":91000} },
    ]
  },
  {
    id: "L3/44",
    level: 3,
    category: "Level 3 - multi-call planning",
    title: "Calculate the monthly salary after taxes for a Doctor",
    requirement: "Calculate the monthly salary after taxes for a Doctor",
    task: "Calculate the monthly salary after taxes for a Doctor",
    toolNames: ["ToolSearcher", "GetOccupationSalary", "TaxCalculator"],
    requiresRetrieval: true,
    expectedCalls: [
      { name: "ToolSearcher", args: {"keywords":"GetOccupationSalary"} },
      { name: "GetOccupationSalary", args: {"occupation":"Doctor"} },
      { name: "ToolSearcher", args: {"keywords":"TaxCalculator"} },
      { name: "TaxCalculator", args: {"salary":"200000"} },
    ],
    mockOutputs: [
      { name: "ToolSearcher", args: {"keywords":"GetOccupationSalary"}, output: {"name":"GetOccupationSalary","description":"API for querying the salary of a given occupation.","input_parameters":{"occupation":{"type":"str","description":"The occupation to query."}},"output_parameters":{"salary":{"type":"float","description":"The salary of the given occupation."}}} },
      { name: "GetOccupationSalary", args: {"occupation":"Doctor"}, output: {"salary":200000} },
      { name: "ToolSearcher", args: {"keywords":"TaxCalculator"}, output: {"name":"TaxCalculator","description":"API for calculating tax deductions based on the given salary.","input_parameters":{"salary":{"type":"float","description":"The salary to calculate tax deductions for."}},"output_parameters":{"salary_after_tax":{"type":"float","description":"The salary after tax deductions."}}} },
      { name: "TaxCalculator", args: {"salary":"200000"}, output: {"salary_after_tax":140000} },
    ]
  },
  {
    id: "L3/45",
    level: 3,
    category: "Level 3 - multi-call planning",
    title: "Update John's personal information and address. Password is 123456. A…",
    requirement: "Update John's personal information and address. Password is 123456. Address is 123 Main St.",
    task: "Update John's personal information and address. Password is 123456. Address is 123 Main St.",
    toolNames: ["ToolSearcher", "AccountInfo", "PersonalInfoUpdate"],
    requiresRetrieval: true,
    expectedCalls: [
      { name: "ToolSearcher", args: {"keywords":"AccountInfo"} },
      { name: "AccountInfo", args: {"username":"John","password":"123456"} },
      { name: "ToolSearcher", args: {"keywords":"PersonalInfoUpdate"} },
      { name: "PersonalInfoUpdate", args: {"username":"John","password":"123456","address":"123 Main St"} },
    ],
    mockOutputs: [
      { name: "ToolSearcher", args: {"keywords":"AccountInfo"}, output: {"name":"AccountInfo","description":"API for retrieving and updating user account information.","input_parameters":{"username":{"type":"str","description":"Name of the user."},"password":{"type":"str","description":"Password of the user."}},"output_parameters":{"status":{"type":"str","description":"success or failed"},"account_info":{"type":"dict","description":"User account information"}}} },
      { name: "AccountInfo", args: {"username":"John","password":"123456"}, output: {"email":"john@example.com","phone":"1234567890"} },
      { name: "ToolSearcher", args: {"keywords":"PersonalInfoUpdate"}, output: {"name":"PersonalInfoUpdate","description":"The API for updating a user's personal information and address.","input_parameters":{"username":{"type":"str","description":"Name of the user."},"password":{"type":"str","description":"Password of the user."},"address":{"type":"str","description":"Updated address information."}},"output_parameters":{"status":{"type":"str","description":"Success or failure"}}} },
      { name: "PersonalInfoUpdate", args: {"username":"John","password":"123456","address":"123 Main St"}, output: {"status":"success"} },
    ]
  },
  {
    id: "L3/46",
    level: 3,
    category: "Level 3 - multi-call planning",
    title: "Update Mary's personal information and address. Password is abcdef. A…",
    requirement: "Update Mary's personal information and address. Password is abcdef. Address is 456 Main St.",
    task: "Update Mary's personal information and address. Password is abcdef. Address is 456 Main St.",
    toolNames: ["ToolSearcher", "AccountInfo", "PersonalInfoUpdate"],
    requiresRetrieval: true,
    expectedCalls: [
      { name: "ToolSearcher", args: {"keywords":"AccountInfo"} },
      { name: "AccountInfo", args: {"username":"Mary","password":"abcdef"} },
      { name: "ToolSearcher", args: {"keywords":"PersonalInfoUpdate"} },
      { name: "PersonalInfoUpdate", args: {"username":"Mary","password":"abcdef","address":"456 Main St"} },
    ],
    mockOutputs: [
      { name: "ToolSearcher", args: {"keywords":"AccountInfo"}, output: {"name":"AccountInfo","description":"API for retrieving and updating user account information.","input_parameters":{"username":{"type":"str","description":"Name of the user."},"password":{"type":"str","description":"Password of the user."}},"output_parameters":{"status":{"type":"str","description":"success or failed"},"account_info":{"type":"dict","description":"User account information"}}} },
      { name: "AccountInfo", args: {"username":"Mary","password":"abcdef"}, output: {"email":"mary@example.com","phone":"0987654321"} },
      { name: "ToolSearcher", args: {"keywords":"PersonalInfoUpdate"}, output: {"name":"PersonalInfoUpdate","description":"The API for updating a user's personal information and address.","input_parameters":{"username":{"type":"str","description":"Name of the user."},"password":{"type":"str","description":"Password of the user."},"address":{"type":"str","description":"Updated address information."}},"output_parameters":{"status":{"type":"str","description":"Success or failure"}}} },
      { name: "PersonalInfoUpdate", args: {"username":"Mary","password":"abcdef","address":"456 Main St"}, output: {"status":"success"} },
    ]
  },
  {
    id: "L3/47",
    level: 3,
    category: "Level 3 - multi-call planning",
    title: "Update Peter's personal information and address. Password is qwerty.…",
    requirement: "Update Peter's personal information and address. Password is qwerty. Address is 789 Main St.",
    task: "Update Peter's personal information and address. Password is qwerty. Address is 789 Main St.",
    toolNames: ["ToolSearcher", "AccountInfo", "PersonalInfoUpdate"],
    requiresRetrieval: true,
    expectedCalls: [
      { name: "ToolSearcher", args: {"keywords":"AccountInfo"} },
      { name: "AccountInfo", args: {"username":"Peter","password":"qwerty"} },
      { name: "ToolSearcher", args: {"keywords":"PersonalInfoUpdate"} },
      { name: "PersonalInfoUpdate", args: {"username":"Peter","password":"qwerty","address":"789 Main St"} },
    ],
    mockOutputs: [
      { name: "ToolSearcher", args: {"keywords":"AccountInfo"}, output: {"name":"AccountInfo","description":"API for retrieving and updating user account information.","input_parameters":{"username":{"type":"str","description":"Name of the user."},"password":{"type":"str","description":"Password of the user."}},"output_parameters":{"status":{"type":"str","description":"success or failed"},"account_info":{"type":"dict","description":"User account information"}}} },
      { name: "AccountInfo", args: {"username":"Peter","password":"qwerty"}, output: {"email":"peter@example.com","phone":"1231231234"} },
      { name: "ToolSearcher", args: {"keywords":"PersonalInfoUpdate"}, output: {"name":"PersonalInfoUpdate","description":"The API for updating a user's personal information and address.","input_parameters":{"username":{"type":"str","description":"Name of the user."},"password":{"type":"str","description":"Password of the user."},"address":{"type":"str","description":"Updated address information."}},"output_parameters":{"status":{"type":"str","description":"Success or failure"}}} },
      { name: "PersonalInfoUpdate", args: {"username":"Peter","password":"qwerty","address":"789 Main St"}, output: {"status":"success"} },
    ]
  },
  {
    id: "L3/48",
    level: 3,
    category: "Level 3 - multi-call planning",
    title: "Update Tom's personal information and address. Password is asdfgh. Ad…",
    requirement: "Update Tom's personal information and address. Password is asdfgh. Address is 012 Main St.",
    task: "Update Tom's personal information and address. Password is asdfgh. Address is 012 Main St.",
    toolNames: ["ToolSearcher", "AccountInfo", "PersonalInfoUpdate"],
    requiresRetrieval: true,
    expectedCalls: [
      { name: "ToolSearcher", args: {"keywords":"AccountInfo"} },
      { name: "AccountInfo", args: {"username":"Tom","password":"asdfgh"} },
      { name: "ToolSearcher", args: {"keywords":"PersonalInfoUpdate"} },
      { name: "PersonalInfoUpdate", args: {"username":"Tom","password":"asdfgh","address":"012 Main St"} },
    ],
    mockOutputs: [
      { name: "ToolSearcher", args: {"keywords":"AccountInfo"}, output: {"name":"AccountInfo","description":"API for retrieving and updating user account information.","input_parameters":{"username":{"type":"str","description":"Name of the user."},"password":{"type":"str","description":"Password of the user."}},"output_parameters":{"status":{"type":"str","description":"success or failed"},"account_info":{"type":"dict","description":"User account information"}}} },
      { name: "AccountInfo", args: {"username":"Tom","password":"asdfgh"}, output: {"email":"tom@example.com","phone":"4564564567"} },
      { name: "ToolSearcher", args: {"keywords":"PersonalInfoUpdate"}, output: {"name":"PersonalInfoUpdate","description":"The API for updating a user's personal information and address.","input_parameters":{"username":{"type":"str","description":"Name of the user."},"password":{"type":"str","description":"Password of the user."},"address":{"type":"str","description":"Updated address information."}},"output_parameters":{"status":{"type":"str","description":"Success or failure"}}} },
      { name: "PersonalInfoUpdate", args: {"username":"Tom","password":"asdfgh","address":"012 Main St"}, output: {"status":"success"} },
    ]
  },
  {
    id: "L3/49",
    level: 3,
    category: "Level 3 - multi-call planning",
    title: "Update Jerry's personal information and address. Password is zxcvbn.…",
    requirement: "Update Jerry's personal information and address. Password is zxcvbn. Address is 345 Main St.",
    task: "Update Jerry's personal information and address. Password is zxcvbn. Address is 345 Main St.",
    toolNames: ["ToolSearcher", "AccountInfo", "PersonalInfoUpdate"],
    requiresRetrieval: true,
    expectedCalls: [
      { name: "ToolSearcher", args: {"keywords":"AccountInfo"} },
      { name: "AccountInfo", args: {"username":"Jerry","password":"zxcvbn"} },
      { name: "ToolSearcher", args: {"keywords":"PersonalInfoUpdate"} },
      { name: "PersonalInfoUpdate", args: {"username":"Jerry","password":"zxcvbn","address":"345 Main St"} },
    ],
    mockOutputs: [
      { name: "ToolSearcher", args: {"keywords":"AccountInfo"}, output: {"name":"AccountInfo","description":"API for retrieving and updating user account information.","input_parameters":{"username":{"type":"str","description":"Name of the user."},"password":{"type":"str","description":"Password of the user."}},"output_parameters":{"status":{"type":"str","description":"success or failed"},"account_info":{"type":"dict","description":"User account information"}}} },
      { name: "AccountInfo", args: {"username":"Jerry","password":"zxcvbn"}, output: {"email":"jerry@example.com","phone":"7897897890"} },
      { name: "ToolSearcher", args: {"keywords":"PersonalInfoUpdate"}, output: {"name":"PersonalInfoUpdate","description":"The API for updating a user's personal information and address.","input_parameters":{"username":{"type":"str","description":"Name of the user."},"password":{"type":"str","description":"Password of the user."},"address":{"type":"str","description":"Updated address information."}},"output_parameters":{"status":{"type":"str","description":"Success or failure"}}} },
      { name: "PersonalInfoUpdate", args: {"username":"Jerry","password":"zxcvbn","address":"345 Main St"}, output: {"status":"success"} },
    ]
  },
];

export function getScenario(id: string): ApiScenario | undefined {
  return SCENARIOS.find((scenario) => scenario.id === id);
}
