SkillList = new Mongo.Collection('skill');
/*
name:String
character: character id
ai: skillAi id
 */

if (Meteor.isClient){
  Template.skillSelector.helpers({
    availableSkill: function () {
      return SkillList.find().fetch();
    },
    selectedSkill: function(){
      return SkillList.find().fetch();//send back only those belonging to selected character
    }
  });
}

if (Meteor.isServer){

}