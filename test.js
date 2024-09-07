

/*Instead of trying to subclass,
why not use the duck-typing 
initiative to extend with
components and dependency-injection?
*/
var Duck = function (flyable, movable, speakable) {

    this.speak = speakable.speak;
    this.fly = flyable.fly;
    this.position = movable.position;

    flyable.subscribe("takeoff", movable.leaveGround);
    flyable.subscribe("land",    movable.hitGround);

}


var duck = new Duck(new BirdFlier(), new BirdWalker(), new Quacker());

var plane = new Duck(new VehicleFlier(), new Drivable(), new Radio());


duck.speak(); // "quack"
plane.speak(); // "Roger"

/*Notice that plane is happily
using the same constructor as duck.

They don't even require a 
constructor in the first place.
A factory would work just as well.

The point of DuckTyping is that
object-construction isn't the 
concern of the program using the
object.

As long as it has the same 
method/property names, the program
will use them, regardless of 
sub/super/static inheritance.

EDIT: added example components

There are a couple of different 
ideas here that I'm tying together.
So one dot at a time:

First, the basic premise of
duck-typing:
*/
// the basic nature of duck-typing
var sheriff = {
    gun : {
        aim : function () { /* point gun somewhere */ },
        bullets : 6,
        fire : function () {
            if (this.bullets === 0) { return; }
            this.bullets -= 1;
            /* ... et cetera */
        }
    },
    draw : function () {
        this.gun.aim();
        this.gun.fire();
    }
},

cartoonist = {
    pen : { scribble : function () { /* ... */ } },
    draw : function () { this.pen.scribble(); }
},

graphicsCard = {
    pixels : [ /* ... */ ],
    screen : { /* ... */ },
    draw : function () {
        pixels.forEach(function (pixel) { screen.draw(pixel); });
    }
};


// duck-typing at its finest:
sheriff.draw();
cartoonist.draw();
graphicsCard.draw();

/*The goal being to write 
functions which don't bother to 
check what kind of object it is:
*/
function duckDraw (array) { array.forEach(function (obj) { obj.draw(); }); }
duckDraw([ sheriff, cartoonist, graphicsCard ]);

/*So if you've got a sea_turtle,
a dolphin, a whale, a submarine
and a minnow, your program 
doesn't have to care about the 
differences in how they swim. It
just cares that they can all
.swim();. Each item can worry 
about itself, and the special
way it does what it needs to do.

Duck-Typing

Next is dependency-injection.
In a way, dependency-injection 
also uses duck-typing, but on the
inside of your class, instead of
the outside (or if you do it
like I did up top, it starts on
the inside, and then allows for
duck-typing on the outside, as
well).

Think of it like this: Instead
of a person inheriting something,
just hand it to them.

If you have a soldier, a sniper a
plane and a tank, each one needs
a gun. Instead of trying to
subclass so that they can all 
fire... ...why not make different 
kinds of guns, to meet your
needs, and hand them all what
they need?
*/
var Rifle = function () {
    this.reload = function () {};
    this.fire = function () { /* ... */ };
},

SniperRifle = function () {
    this.reload = function () {};
    this.fire = function () {};
},

MachineGun = function () {
    this.reload = function () {};
    this.fire = function () {};
},

Cannon = function () {
    this.reload = function () {};
    this.fire = function () {};
};

/*So now we've got different
kinds of guns... You might think
that because they've got the same
function-names, and they all deal
with bullets, so you could try to
subclass... ...but you don't need
to - none of these guns do the
same thing when they fire or
reload... ...so you'd end up
writing overrides to an abstract 
virtual method/property in some
other language, which would be
useless.

So now that we've got them, we
can see how we can "inject" them,
and what that does for us:
*/
var Soldier = function (gun) {
    this.currentGun = gun;
    this.inventory = {
        guns : [ gun ]
    };
    this.attack = function () { this.currentGun.fire(); };
};

var Sniper = function (gun) {
    this.currentGun = gun;
    this.inventory = {
        guns : [ gun ]
    };
    this.attack = function () { this.currentGun.fire(); };
};

var Plane = function (gun) {
    this.currentGun = gun;
    this.inventory = {
        guns : [ gun ]
    };
    this.attack = function () { this.currentGun.fire(); };
};

var Tank = function (gun) {
    this.currentGun = gun;
    this.inventory = {
        guns : [ gun ]
    };
    this.attack = function () { this.currentGun.fire(); };
};


var soldier = new Soldier( new Rifle() ),
    sniper  = new Sniper( new SniperRifle() ),
    plane   = new Plane( new MachineGun() ),
    tank    = new Tank( new Cannon() );

/*So now we've got these classes
where they call their guns -- 
they don't care what kind of gun,
and it just works, because the
gun knows how the gun works and
the combatant knows how to fire
a gun, and the program knows how
to tell a combatant to fire.

But if you look a little closer,
the inner code for each combatant
is 100% the same for now.

So why not just have a 'Combatant'
that you can give specialized 
components?
*/


var Combatant = function (gun) {
    this.currentGun = gun;
    this.inventory = {
        guns : [ gun ]
    };
    this.attack = function () { this.currentGun.fire(); };
};

var soldier = new Combatant( new Rifle() );

/*So the insides of the 
constructor are duck-typing gun,
and if you had different classes
for combatants, and each class 
had a fire method, then you can
duck-type your units in the
game-logic as well.

Ultimately, the constructor would
just hold modules: one module to
handle shooting, one to handle
ground movement, one for drawing,
one for player controls, etc...
The constructor wouldn't have to 
do anything except put the pieces
in touch with one another, and 
you could make units special by 
giving them different kinds of
guns, or different kinds of
movement, or different kinds of 
health, which operate differently
on the inside, but have the same
properties and method names for
public access.
*/
var another = new Combatant(new Cannon())

