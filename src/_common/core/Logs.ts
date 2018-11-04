/**
 * add Console log crédit depend of properties
 */
export default class Logs
{

    public static EnvLogs(bundleName?:string)
    {
        if ((process.env.NODE_ENV === 'dev'))
        {
           return (
               console.log(`%c${bundleName}`, 'background:#004948; color: white; padding:3px 8px; ')
           )
        }
        else
        {
            return (
                console.log('-'),
                console.log('%c dev by Willy Brauner ', 'background:#004948; color: white; padding:5px 10px; '),
                console.log("%c http://willybrauner.com ", "color: white; :5px 10px;"),
                console.log('-')
            )
        }
    }

}