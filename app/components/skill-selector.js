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
    currentSkill: function(){
      return SkillList.find().fetch();//send back only those belonging to current character
    }
  });
}

if (Meteor.isServer){

}