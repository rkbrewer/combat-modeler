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
...(omitted)

Refining the above, it would be neat to have some prebuilt formula that scale well baked into the modeler.
Later, an "advanced" editor could implement something like mentioned above, but for 1.0, it would be awesome to dumb
things down a bit:
Skill:
  name: "Fire I"
  type: x Spell based  o Weapon based
  cost: 30 mp (field only available if skill is spell-based)
  ~~effect: "damage" "target" by "spellpower" "times:5"~~
  ~~effect: "heal" "caster" by "spellpower" "plus:30"~~
  effect: "heal"
  effect target: "current target"
  efficacy: 0.25

The real trick here is building a system where the developer only needs to worry about a single number, the efficacy.
The math will have to hide everything else under the hood, and allow the game to scale well given this single variable
from the developer.
Effect options include: heal, damage, alter stat, status effect
Effect targets include: current target, self, all enemies, all heroes, all enemies and heroes, all enemies and heroes except caster

Example:
Skill:
  Name: "Protect I"
  type: x Spell based
  cost: 15 mp
  effect: "alter stat"
  effect target: "current target"
  stat:"defense"
  efficacy: 9999


Example 2, skills can have multiple effects, and conditional ai for availability
Skill:
  Name: "Shield Bash"
  type: weapon based
  effect: dmg
  effect target: current target
  efficacy: 2
  effect: stun
  effect target: current target
  efficacy: 30

Skill AI:
  must have shield equipped
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