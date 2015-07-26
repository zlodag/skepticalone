'use strict';

/**
 * @ngdoc service
 * @name betterpageApp.betterpageReasons
 * @description
 * # betterpageReasons
 * Value in the betterpageApp.
 */
angular.module('betterpageApp')
.value('betterpageReasons', {
    // 1: no clinical concern, 2: low 3: medium 4: high priority concern
    "ADDS 3":{beep: 2,group: "High ADDS - specify why"}, 
    "ADDS 4":{beep: 3,group: "High ADDS - specify why"}, 
    "ADDS 5+":{beep: 4,group: "High ADDS - specify why"},
    "Pain":{beep: 2,group: "Concern"}, 
    "Short of breath":{beep: 3,group: "Concern"}, 
    "Nausea":{beep: 2,group: "Concern"}, 
    "Urinary retention":{beep: 2,group: "Concern"}, 
    "Wound":{beep: 2,group: "Concern"}, 
    "Clarify plan":{beep: 1,group: "Concern"}, 
    "Fluids":{beep: 1,group: "Medication"}, 
    "Sleeping pill":{beep: 1,group: "Medication"}, 
    "Laxatives":{beep: 1,group: "Medication"}, 
    "Regular Meds":{beep: 1,group: "Medication"}, 
    "IV line/bloods":{beep: 1,group: "Task"}, 
    "Review result":{beep: 1,group: "Task"}, 
    "Admit":{beep: 1,group: "Task"}, 
    "Discharge":{beep: 1,group: "Task"}, 
    "Rechart":{beep: 1,group: "Task"}, 
    "Consent":{beep: 1,group: "Task"}, 
    "Inform":{beep: 1,group: "Other - specify below"}, 
    "Call urgently!":{beep: 4,group: "Other - specify below"}, 
    "Review urgently!":{beep: 4,group: "Other - specify below"}, 
    "Custom":{beep: 1,group: "Other - specify below"}
});
