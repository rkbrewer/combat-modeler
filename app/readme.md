

Read ByExample's chapter 7 section on AI Decision Making for an overview on AI Goal Selection. Then read chapter 9
 for details on Decision Making.
 
 Chapter 9 outlines Goal-Driven Agent Behavior. This is contrasted to the Finite State Machine based
 architecture. In this Goal Driven behavior, instead of states, an agent's behavior is driven by
 a collection hierarchical goals.
 
 Goals are either atomic or composite. Automic goals include things like "reload gun" or "use health potion"
 whereas composite goals are composed of several subgoals, which in turn may be either composite or atomic,
 thereby defining a *nested hierarchy*.
 
 Either type of Goal is able to monitor its status and replan if they fail.
  
  > Some composite goals my mobs may have could be "Fight Aggressively", "Hulk Smash", "Steal and Run",
  "Fight Defensively"... it might make sense to keep these simple. No one likes fighting a hard 
  guy who always runs away when his health is low, even if it **is** the *smartest* thing for the 
  mob to do...
  
  > However, it may be fun to have their goals change as their mood changes? (Or is that too complicated?)
  
Regardless, the mob can select from abstract high level goals, which can be broken down into subtasks.
Sometimes there will be a decision that needs to be made in the subtask. (Attack?&mdash;With what? Who?)

Each "think update" the mob will examine the game state and select from a set of predefined high-level goals
or *strategies*, the one it believes will most likely enable it to satisfy its strongest desire
(usually to win the battle). The mob will then decompose it into its subgoals and carry those out until
the goal has either been satisfied or failed, or another strategy is necessitated.

# Hierarchical Goals of a Mob v1.0

* Fight Aggressively
  * healthy ? attack : heal
    * attack
      * swordDmg > spellDmg on target ? attack(sword) : attack(spell)
      * tend to conserve mana for attacks not heals
    * heal
      * health very low ? big heal : small heal
      * tend to use items for ...ugh, what's the difference between aggressive vs defensive fighting styles?
* Fight Defensively
  * heathy ? attack : heal
    * attack

# Personalities in Hierarchical Goal-based Arbitration Design

There are many simple spin-off concepts HGBAD can conquer such as Personalities, State Memory, Command Queueing,
Using the Queue for Scripted Behavior (eg, minion go there, open chest, grab gold, bring it back)