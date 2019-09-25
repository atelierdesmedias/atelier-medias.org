/**
 * add Console log crédit depend of properties
 */
export default class Logs {
  public static EnvLogs(message?: string) {
    return console.log(
      `%c${message}`,
      'background:#004948; color: white; padding:3px 8px; '
    );
  }
}
