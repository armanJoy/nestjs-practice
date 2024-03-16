export class Util {
  private static readonly uuidRegExp =
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;

  static isValidUuuid = (id: string): boolean => {
    return this.uuidRegExp.test(id);
  };
}
