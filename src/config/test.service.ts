import { Injectable } from '@nestjs/common';

// 抽象类：只能被继承无法被实例化
abstract class Animal {
  eat() {
    console.log('eat');
  }
}
@Injectable()
// Dog继承Animal
export class DogService extends Animal {
  private prop1: string = 'a'; // 私有属性，只能内部调用,实例化对象无法使用
  public prop2: number = 1; // 公共属性
  protected prop3: number[] = [1, 3, 4]; // 受保护属性,实例无法使用 只能在类“Dog”及其子类中访问
  readonly prop4: string[] = ['a']; // 只读属性
  public name: string = '旺财';
  static prop5: number = 100; // 静态属性
  constructor(name?: string) {
    super();
    name && (this.name = name);
    console.log('调用==>', this.prop1);
  }

  sleep() {
    console.log('dog sleep。。。');
  }
}
// husky继承Dog
class husky extends DogService {
  constructor() {
    super();
    console.log('==>', this.prop3);
  }
}
new husky();
const dog = new DogService();
dog.eat();
dog.sleep();
console.log(dog.name, dog.prop2, dog.prop4);
