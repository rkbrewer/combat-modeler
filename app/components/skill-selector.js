SkillList = new Mongo.Collection('skill');
/*
name:String
character: character id
ai: skillAi id


What are skills? What part of them is portable between characters?
Skills are:
 - Attack (w/equipped weapon) (this should be a default prebuilt skill)
   - skill ai:
     - if you can attack (ie, not incapacitated), attack the target with your weapon
 - Cast:[Spell name]

Refining the above, a Skill can be modeled as:
 - Skill name: string
 - Skill type: equipped-weapon || spell
 - Formula: yaml logic, use tags to define something like:
    player.hp += player.int^2
    player.mp -= 30
 - Skill AI: yaml conditional logic for availability, such as "If you can attack, attack target."

Example YAML Formula for Heal I.:
player_hp: player_hp + player_int^2
player_mp: player_mp - 30

Example YAML Formula for Fire II.:
target_hp: target_hp - player_int^2 + 100
player_mp: player_mp - 60

Example YAML AI:

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