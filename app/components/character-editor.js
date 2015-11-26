CharacterList = new Mongo.Collection('character');
/*
name, hp, mp, strength, defense, agility, luck, createdBy
 */
if (Meteor.isClient) {
  Template.characterEditor.helpers({
    characterList: function () {
      return CharacterList.find({}, {sort:{name:1}});
    },
    selectedCharacter:function(){
      var selectedCharacter = Session.get('character');
      console.log('selected character: ', selectedCharacter);
      return CharacterList.findOne(selectedCharacter);
    }
  });
  Template.characterEditor.events({
    'click .js-character-selector__character':function(){
      var characterId = this._id;
      console.log(characterId);
      Session.set('character', characterId);
    },
    'click .js-insert-new-character': function () {
      Meteor.call('insertNewCharacter', function(result){
        Session.set('character', result);
      });
    },
    'submit .character-data':         function (event) {
      Meteor.call('updateCharacterData', {
        name:    event.target.name.value,
        hp:      event.target.hp.value,
        mp:      event.target.mp.value,
        agility: event.target.agility.value,
        defense: event.target.defense.value,
        luck:    event.target.luck.value
      });
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
    updateCharacterData: function (data) {

    }
  })
}