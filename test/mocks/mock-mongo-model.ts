/* eslint-disable @typescript-eslint/no-explicit-any */
export class MockMongoModel {
  public prototype: MockMongoModel;

  constructor() {
    this.prototype = this;
    return this;
  }

  static aggregate() {
    return this;
  }

  static countDocuments(): any {
    return this;
  }

  static lean() {
    return this;
  }

  static lookup() {
    return this;
  }

  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  static exec(): any {
    return this;
  }

  static find() {
    return this;
  }

  static findById(): any {
    return this;
  }

  static findByIdAndUpdate(): any {
    return this;
  }

  static findByIdAndDelete(): any {
    return this;
  }

  static findOne() {
    return this;
  }

  static populate() {
    return this;
  }

  static select() {
    return this;
  }

  save(): any {
    return this;
  }

  static unwind() {
    return this;
  }
}
