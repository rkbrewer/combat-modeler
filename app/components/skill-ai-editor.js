SkillAiList = new Mongo.Collection('skillAi');
/*
yaml scripting
 */

if (Meteor.isClient){
  Template.skillAiEditor.helpers({
    ai: function () {
      // TODO fetch the AI for the selected Skill
      Meteor.call('getSkillAi', 'someSkillId', function (error, result) {
        Session.set('skillAi', result);
      });
      return Session.get('skillAi');
    }
  });
  Template.skillAiEditor.events({
    'click button': function () {
      Meteor.call('setSkillAi', $('#js-skill-ai-editor').val(), function (error, result) {
        Session.set('skillAi', result);
      });
    }
  });
}

if (Meteor.isServer){
  Meteor.methods({
    setSkillAi: function (yamlString) {
      var skillAi = YAML.safeLoad(yamlString);
      SkillAiList.insert(skillAi);
      return yaml;
    },
    getSkillAi: function (skillId) {
      var skillAi = SkillAiList.find().fetch();
      return YAML.safeDump(skillAi);
    }
  });
}