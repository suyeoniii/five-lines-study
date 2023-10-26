const TILE_SIZE = 30;
const FPS = 30;
const SLEEP = 1000 / FPS;

class Player {
  private x = 1;
  private y = 1;
  getX() {
    return this.x;
  }
  getY() {
    return this.y;
  }
  setX(x: number) {
    this.x = x;
  }
  setY(y: number) {
    this.y = y;
  }
  drawPlayer(g: CanvasRenderingContext2D) {
    g.fillStyle = "#ff0000";
    g.fillRect(this.x * TILE_SIZE, this.y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
}
let player = new Player();

class FallStrategy {
  constructor(private falling: FallingState) {}

  update(tile: Tile, x: number, y: number) {
    this.falling = map[y + 1][x].getBlockOnTopState();
    this.falling.drop(y, x, tile);
  }

  moveHorizontal(player: Player, tile: Tile, dx: number) {
    this.falling.moveHorizontal(player, tile, dx);
  }
}

interface FallingState {
  isFalling(): boolean;
  moveHorizontal(player: Player, tile: Tile, dx: number): void;
  drop(y: number, x: number, tile: Tile): void;
}

class Falling implements FallingState {
  isFalling() {
    return true;
  }
  moveHorizontal(player: Player, tile: Tile, dx: number) {}
  drop(y: number, x: number, tile: Tile) {
    map[y + 1][x] = tile;
    map[y][x] = new Air();
  }
}

class Resting implements FallingState {
  isFalling() {
    return false;
  }
  moveHorizontal(player: Player, tile: Tile, dx: number) {
    if (
      map[player.getY()][player.getX() + dx + dx].isAir() &&
      !map[player.getY() + 1][player.getX() + dx].isAir()
    ) {
      map[player.getY()][player.getX() + dx + dx] = tile;
      moveToTile(player, player.getX() + dx, player.getY());
    }
  }
  drop(y: number, x: number, tile: Tile) {}
}

enum RawTile {
  AIR,
  FLUX,
  UNBREAKABLE,
  PLAYER,
  STONE,
  FALLING_STONE,
  BOX,
  FALLING_BOX,
  KEY1,
  LOCK1,
  KEY2,
  LOCK2,
}

interface Tile {
  isAir(): boolean;
  isFlux(): boolean;
  isKey1(): boolean;
  isLock1(): boolean;
  isKey2(): boolean;
  isLock2(): boolean;
  draw(g: CanvasRenderingContext2D, x: number, y: number): void;
  moveHorizontal(player: Player, dx: number): void;
  moveVertical(player: Player, dy: number): void;
  isStony(): boolean;
  isBoxy(): boolean;
  drop(): void;
  rest(): void;
  isFalling(): boolean;
  canFall(): boolean;
  update(x: number, y: number): void;
  getBlockOnTopState(): FallingState;
}

class Air implements Tile {
  isAir(): boolean {
    return true;
  }
  isFlux(): boolean {
    return false;
  }
  isKey1(): boolean {
    return false;
  }
  isLock1(): boolean {
    return false;
  }
  isKey2(): boolean {
    return false;
  }
  isLock2(): boolean {
    return false;
  }
  draw(g: CanvasRenderingContext2D, x: number, y: number): void {}
  fillRect(g: CanvasRenderingContext2D, x: number, y: number) {}
  moveHorizontal(player: Player, dx: number) {
    moveToTile(player, player.getX() + dx, player.getY());
  }
  moveVertical(player: Player, dy: number) {
    moveToTile(player, player.getX(), player.getY() + dy);
  }
  isStony() {
    return false;
  }
  isBoxy() {
    return false;
  }
  drop() {}
  rest() {}
  isFalling() {
    return false;
  }
  canFall() {
    return false;
  }
  update(x: number, y: number) {}
  getBlockOnTopState() {
    return new Falling();
  }
}

class Flux implements Tile {
  isAir(): boolean {
    return false;
  }
  isFlux(): boolean {
    return true;
  }
  isKey1(): boolean {
    return false;
  }
  isLock1(): boolean {
    return false;
  }
  isKey2(): boolean {
    return false;
  }
  isLock2(): boolean {
    return false;
  }
  draw(g: CanvasRenderingContext2D, x: number, y: number): void {
    g.fillStyle = "#ccffcc";
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
  moveHorizontal(player: Player, dx: number) {
    moveToTile(player, player.getX() + dx, player.getY());
  }
  moveVertical(player: Player, dy: number) {
    moveToTile(player, player.getX(), player.getY() + dy);
  }
  isStony() {
    return false;
  }
  isBoxy() {
    return false;
  }
  drop() {}
  rest() {}
  isFalling() {
    return false;
  }
  canFall() {
    return false;
  }
  update(x: number, y: number) {}
  getBlockOnTopState(): FallingState {
    return new Resting();
  }
}

class Unbreakable implements Tile {
  isAir(): boolean {
    return false;
  }
  isFlux(): boolean {
    return false;
  }
  isKey1(): boolean {
    return false;
  }
  isLock1(): boolean {
    return false;
  }
  isKey2(): boolean {
    return false;
  }
  isLock2(): boolean {
    return false;
  }
  draw(g: CanvasRenderingContext2D, x: number, y: number): void {
    g.fillStyle = "#999999";
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
  moveHorizontal(player: Player, dx: number) {}
  moveVertical(player: Player, dy: number) {}
  isStony() {
    return false;
  }
  isBoxy() {
    return false;
  }
  drop() {}
  rest() {}
  isFalling() {
    return false;
  }
  canFall() {
    return false;
  }
  update(x: number, y: number) {}
  getBlockOnTopState(): FallingState {
    return new Resting();
  }
}

class PlayerTile implements Tile {
  isAir(): boolean {
    return false;
  }
  isFlux(): boolean {
    return false;
  }
  isKey1(): boolean {
    return false;
  }
  isLock1(): boolean {
    return false;
  }
  isKey2(): boolean {
    return false;
  }
  isLock2(): boolean {
    return false;
  }
  draw(g: CanvasRenderingContext2D, x: number, y: number): void {}
  moveHorizontal(player: Player, dx: number) {}
  moveVertical(player: Player, dy: number) {}
  isStony() {
    return false;
  }
  isBoxy() {
    return false;
  }
  drop() {}
  rest() {}
  isFalling() {
    return false;
  }
  canFall() {
    return false;
  }
  update(x: number, y: number) {}
  getBlockOnTopState(): FallingState {
    return new Resting();
  }
}

class Stone implements Tile {
  private fallStrategy: FallStrategy;
  constructor(private falling: FallingState) {
    this.fallStrategy = new FallStrategy(falling);
  }

  isAir(): boolean {
    return false;
  }
  isFlux(): boolean {
    return false;
  }
  isKey1(): boolean {
    return false;
  }
  isLock1(): boolean {
    return false;
  }
  isKey2(): boolean {
    return false;
  }
  isLock2(): boolean {
    return false;
  }
  draw(g: CanvasRenderingContext2D, x: number, y: number): void {
    g.fillStyle = "#0000cc";
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
  moveHorizontal(player: Player, dx: number) {
    this.fallStrategy.moveHorizontal(player, this, dx);
  }
  moveVertical(player: Player, dy: number) {
    moveToTile(player, player.getX(), player.getY() + dy);
  }
  isStony() {
    return true;
  }
  isBoxy() {
    return false;
  }
  drop() {
    this.falling = new Falling();
  }
  rest() {
    this.falling = new Resting();
  }
  isFalling() {
    return this.falling.isFalling();
  }
  canFall() {
    return true;
  }
  update(x: number, y: number) {
    this.fallStrategy.update(this, x, y);
  }
  getBlockOnTopState(): FallingState {
    return new Resting();
  }
}

class Box implements Tile {
  constructor(private falling: FallingState) {}

  isAir(): boolean {
    return false;
  }
  isFlux(): boolean {
    return false;
  }
  isKey1(): boolean {
    return false;
  }
  isLock1(): boolean {
    return false;
  }
  isKey2(): boolean {
    return false;
  }
  isLock2(): boolean {
    return false;
  }
  draw(g: CanvasRenderingContext2D, x: number, y: number): void {
    g.fillStyle = "#8b4513";
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
  moveHorizontal(player: Player, dx: number) {
    if (true) {
      if (
        map[player.getY()][player.getX() + dx + dx].isAir() &&
        !map[player.getY() + 1][player.getX() + dx].isAir()
      ) {
        map[player.getY()][player.getX() + dx + dx] = this;
        moveToTile(player, player.getX() + dx, player.getY());
      }
    }
  }
  moveVertical(player: Player, dy: number) {
    moveToTile(player, player.getX(), player.getY() + dy);
  }
  isStony() {
    return false;
  }
  isBoxy() {
    return true;
  }
  drop() {
    this.falling = new Falling();
  }
  rest() {
    this.falling = new Resting();
  }
  isFalling() {
    return this.falling.isFalling();
  }
  canFall() {
    return true;
  }
  update(x: number, y: number) {
    if (map[y + 1][x].isAir()) {
      map[y][x].drop();
      map[y + 1][x] = map[y][x];
      map[y][x] = new Air();
    } else if (map[y][x].isFalling()) {
      map[y][x].rest();
    }
  }
  getBlockOnTopState(): FallingState {
    return new Resting();
  }
}

class Key implements Tile {
  constructor(private keyConf: KeyConfiguration) {}
  isAir(): boolean {
    return false;
  }
  isFlux(): boolean {
    return false;
  }
  isKey1(): boolean {
    return true;
  }
  isLock1(): boolean {
    return false;
  }
  isKey2(): boolean {
    return false;
  }
  isLock2(): boolean {
    return false;
  }
  draw(g: CanvasRenderingContext2D, x: number, y: number): void {
    this.keyConf.setColor(g);
    this.fillRect(g, x, y);
  }
  fillRect(g: CanvasRenderingContext2D, x: number, y: number) {
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
  moveHorizontal(player: Player, dx: number) {
    this.keyConf.removeLock();
    moveToTile(player, player.getX() + dx, player.getY());
  }
  moveVertical(player: Player, dy: number) {
    this.keyConf.removeLock();
    moveToTile(player, player.getX(), player.getY() + dy);
  }
  isStony() {
    return false;
  }
  isBoxy() {
    return false;
  }
  drop() {}
  rest() {}
  isFalling() {
    return false;
  }
  canFall() {
    return false;
  }
  update(x: number, y: number) {}
  getBlockOnTopState(): FallingState {
    return new Resting();
  }
}

class Lock1 implements Tile {
  constructor(private keyConf: KeyConfiguration) {}
  isAir(): boolean {
    return false;
  }
  isFlux(): boolean {
    return false;
  }
  isKey1(): boolean {
    return false;
  }
  isLock1(): boolean {
    return this.keyConf.is1();
  }
  isKey2(): boolean {
    return false;
  }
  isLock2(): boolean {
    return !this.keyConf.is1();
  }
  draw(g: CanvasRenderingContext2D, x: number, y: number): void {
    this.keyConf.setColor(g);
    this.fillRect(g, x, y);
  }
  fillRect(g: CanvasRenderingContext2D, x: number, y: number) {
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
  moveHorizontal(player: Player, dx: number) {}
  moveVertical(player: Player, dy: number) {}
  isStony() {
    return false;
  }
  isBoxy() {
    return false;
  }
  drop() {}
  rest() {}
  isFalling() {
    return false;
  }
  canFall() {
    return false;
  }
  update(x: number, y: number) {}
  getBlockOnTopState(): FallingState {
    return new Resting();
  }
}

class KeyConfiguration {
  constructor(
    private color: string,
    private _1: boolean,
    private removeStrategy: RemoveStrategy
  ) {}

  getColor() {
    return this.color;
  }
  setColor(g: CanvasRenderingContext2D) {
    g.fillStyle = this.color;
  }
  is1() {
    return this._1;
  }
  removeLock() {
    remove(this.removeStrategy);
  }
  getBlockOnTopState(): FallingState {
    return new Resting();
  }
}

interface RemoveStrategy {
  check(tile: Tile): boolean;
}

class RemoveLock1 {
  check(tile: Tile) {
    return tile.isLock1();
  }
}

class RemoveLock2 {
  check(tile: Tile) {
    return tile.isLock2();
  }
}

interface Input {
  isRight(): boolean;
  isLeft(): boolean;
  isUp(): boolean;
  isDown(): boolean;
  handle(player: Player): void;
}

class Right implements Input {
  isRight() {
    return true;
  }
  isLeft() {
    return false;
  }
  isUp() {
    return false;
  }
  isDown() {
    return false;
  }
  handle(player: Player) {
    moveHorizontal(player, 1);
  }
}

class Left implements Input {
  isRight() {
    return false;
  }
  isLeft() {
    return true;
  }
  isUp() {
    return false;
  }
  isDown() {
    return false;
  }
  handle(player: Player) {
    moveHorizontal(player, -1);
  }
}

class Up implements Input {
  isRight() {
    return false;
  }
  isLeft() {
    return false;
  }
  isUp() {
    return true;
  }
  isDown() {
    return false;
  }

  handle(player: Player) {
    moveVertical(player, -1);
  }
}

class Down implements Input {
  isRight() {
    return false;
  }
  isLeft() {
    return false;
  }
  isUp() {
    return false;
  }
  isDown() {
    return true;
  }

  handle(player: Player) {
    moveVertical(player, 1);
  }
}

let rawMap: RawTile[][] = [
  [2, 2, 2, 2, 2, 2, 2, 2],
  [2, 3, 0, 1, 1, 2, 0, 2],
  [2, 4, 2, 6, 1, 2, 0, 2],
  [2, 8, 4, 1, 1, 2, 0, 2],
  [2, 4, 1, 1, 1, 9, 0, 2],
  [2, 2, 2, 2, 2, 2, 2, 2],
];
let map: Tile[][];

function assertExhausted(x: never) {
  throw new Error("Unexpected object " + x);
}

const YELLOW_KEY = new KeyConfiguration("#ffcc00", true, new RemoveLock1());
const BLUE_KEY = new KeyConfiguration("#00ccff", false, new RemoveLock2());

function transformTile(tile: RawTile) {
  switch (tile) {
    case RawTile.AIR:
      return new Air();
    case RawTile.FLUX:
      return new Flux();
    case RawTile.PLAYER:
      return new PlayerTile();
    case RawTile.UNBREAKABLE:
      return new Unbreakable();
    case RawTile.BOX:
      return new Box(new Resting());
    case RawTile.FALLING_BOX:
      return new Box(new Falling());
    case RawTile.STONE:
      return new Stone(new Resting());
    case RawTile.FALLING_STONE:
      return new Stone(new Falling());
    case RawTile.KEY1:
      return new Key(YELLOW_KEY);
    case RawTile.LOCK1:
      return new Lock1(YELLOW_KEY);
    case RawTile.KEY2:
      return new Key(BLUE_KEY);
    case RawTile.LOCK2:
      return new Lock1(BLUE_KEY);
    default:
      assertExhausted(tile);
  }
}

function transformMap() {
  map = new Array(rawMap.length);
  for (let y = 0; y < rawMap.length; y++) {
    map[y] = new Array(rawMap[y].length);
    for (let x = 0; x < rawMap[y].length; x++) {
      map[y][x] = transformTile(rawMap[y][x]);
    }
  }
}

let inputs: Input[] = [];

function remove(shouldRemove: RemoveLock1) {
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (shouldRemove.check(map[y][x])) {
        map[y][x] = new Air();
      }
    }
  }
}

function moveToTile(player: Player, newx: number, newy: number) {
  map[player.getY()][player.getX()] = new Air();
  map[newy][newx] = new PlayerTile();
  player.setX(newx);
  player.setY(newy);
}

function moveHorizontal(player: Player, dx: number) {
  map[player.getY()][player.getX() + dx].moveHorizontal(player, dx);
}

function moveVertical(player: Player, dy: number) {
  if (
    map[player.getY() + dy][player.getX()].isFlux() ||
    map[player.getY() + dy][player.getX()].isAir()
  ) {
    moveToTile(player, player.getX(), player.getY() + dy);
  } else if (map[player.getY() + dy][player.getX()].isKey1()) {
    remove(new RemoveLock1());
    moveToTile(player, player.getX(), player.getY() + dy);
  } else if (map[player.getY() + dy][player.getX()].isKey2()) {
    remove(new RemoveLock2());
    moveToTile(player, player.getX(), player.getY() + dy);
  }
}

function update(player: Player) {
  handleInputs(player);
  updateMap();
}

function updateMap() {
  for (let y = map.length - 1; y >= 0; y--) {
    for (let x = 0; x < map[y].length; x++) {
      map[y][x].update(x, y);
    }
  }
}

function handleInputs(player: Player) {
  while (inputs.length > 0) {
    let current = inputs.pop();
    handleInput(player, current);
  }
}

function handleInput(player: Player, input: Input) {
  input.handle(player);
}

function draw(player: Player) {
  let g = createGraphics();
  drawMap(g);
  player.drawPlayer(g);
}

function createGraphics() {
  let canvas = document.getElementById("GameCanvas") as HTMLCanvasElement;
  let g = canvas.getContext("2d");

  g.clearRect(0, 0, canvas.width, canvas.height);
  return g;
}

function drawMap(g: CanvasRenderingContext2D) {
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      map[y][x].draw(g, x, y);
    }
  }
}

function gameLoop(player: Player) {
  let before = Date.now();
  update(player);
  draw(player);
  let after = Date.now();
  let frameTime = after - before;
  let sleep = SLEEP - frameTime;
  setTimeout(() => gameLoop(player), sleep);
}

window.onload = () => {
  transformMap();
  gameLoop(player);
};

const LEFT_KEY = "ArrowLeft";
const UP_KEY = "ArrowUp";
const RIGHT_KEY = "ArrowRight";
const DOWN_KEY = "ArrowDown";
window.addEventListener("keydown", (e) => {
  if (e.key === LEFT_KEY || e.key === "a") inputs.push(new Left());
  else if (e.key === UP_KEY || e.key === "w") inputs.push(new Up());
  else if (e.key === RIGHT_KEY || e.key === "d") inputs.push(new Right());
  else if (e.key === DOWN_KEY || e.key === "s") inputs.push(new Down());
});
