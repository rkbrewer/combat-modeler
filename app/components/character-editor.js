CharacterList = new Mongo.Collection('character');
/*
 name, hp, mp, strength, defense, agility, luck, createdBy
 */
if (Meteor.isClient) {
  Template.characterEditor.helpers({
    characterList:     function () {
      return CharacterList.find({}, {sort: {name: 1}});
    },
    selectedCharacter: function () {
      var selectedCharacter = Session.get('character');
      return CharacterList.findOne(selectedCharacter);
    }
  });
  Template.characterEditor.events({
    'click .js-character-selector__character': function () {
      var characterId = this._id;
      Session.set('character', characterId);
    },
    'click .js-insert-new-character':          function () {
      Meteor.call('insertNewCharacter', function (result) {
        Session.set('character', result);
      });
      //TODO select nav item for newly created character. The 'active' class should be set by the Session character model
    },
    'submit .character-editor':                function (event) {
      event.preventDefault();
      var selectedCharacter = Session.get('character');
      var data = {
        name:    event.target.cName.value,
        hp:      event.target.cHp.value,
        mp:      event.target.cMp.value,
        agility: event.target.cAgility.value,
        defense: event.target.cDefense.value,
        luck:    event.target.cLuck.value
      };
      Meteor.call('updateCharacterData', selectedCharacter, data);
    }
  })
}

if (Meteor.isServer) {
  Meteor.methods({
    insertNewCharacter:  function () { // creates a new character with ill advised defaults
      var currentUser = Meteor.userId();
      CharacterList.insert({
        name:      'New Character',
        hp:        1,
        mp:        1,
        strength:  1,
        defense:   1,
        agility:   1,
        luck:      1,
        createdBy: currentUser
      });
    },
    updateCharacterData: function (characterId, data) {
      //TODO update the selectedCharacter, use the id, and the $set methods
      //TODO include createdBy key in the document selector for security reasons
      CharacterList.update({_id: characterId}, {
        $set: data
      });
    }
  })
}