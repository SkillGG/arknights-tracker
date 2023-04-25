
/**
 * Client
**/

import * as runtime from './runtime/library';
type UnwrapPromise<P extends any> = P extends Promise<infer R> ? R : P
type UnwrapTuple<Tuple extends readonly unknown[]> = {
  [K in keyof Tuple]: K extends `${number}` ? Tuple[K] extends Prisma.PrismaPromise<infer X> ? X : UnwrapPromise<Tuple[K]> : UnwrapPromise<Tuple[K]>
};

export type PrismaPromise<T> = runtime.Types.Public.PrismaPromise<T>


/**
 * Model AkPity
 * 
 */
export type AkPity = {
  standard: number
  special: Prisma.JsonValue[]
}

/**
 * Model AkSettings
 * 
 */
export type AkSettings = {
  saveHistory: boolean
  sendHistoryToDB: boolean
  characterDatabase: boolean
  clickToSelectOutcome: boolean
  allowCombinations: boolean
}

/**
 * Model akdata
 * 
 */
export type akdata = {
  id: string
  history: Prisma.JsonValue
  pity: AkPity
  settings: AkSettings
  userId: string | null
}

/**
 * Model users
 * 
 */
export type users = {
  id: string
  username: string
  pass: string
}


/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Akdata
 * const akdata = await prisma.akdata.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  T extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof T ? T['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<T['log']> : never : never,
  GlobalReject extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined = 'rejectOnNotFound' extends keyof T
    ? T['rejectOnNotFound']
    : false
      > {
    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Akdata
   * const akdata = await prisma.akdata.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<T, Prisma.PrismaClientOptions>);
  $on<V extends (U | 'beforeExit')>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : V extends 'beforeExit' ? () => Promise<void> : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): Promise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): Promise<void>;

  /**
   * Add a middleware
   */
  $use(cb: Prisma.Middleware): void

/**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P]): Promise<UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<this, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use">) => Promise<R>, options?: { maxWait?: number, timeout?: number }): Promise<R>

  /**
   * Executes a raw MongoDB command and returns the result of it.
   * @example
   * ```
   * const user = await prisma.$runCommandRaw({
   *   aggregate: 'User',
   *   pipeline: [{ $match: { name: 'Bob' } }, { $project: { email: true, _id: false } }],
   *   explain: false,
   * })
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $runCommandRaw(command: Prisma.InputJsonObject): Prisma.PrismaPromise<Prisma.JsonObject>

      /**
   * `prisma.akdata`: Exposes CRUD operations for the **akdata** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Akdata
    * const akdata = await prisma.akdata.findMany()
    * ```
    */
  get akdata(): Prisma.akdataDelegate<GlobalReject>;

  /**
   * `prisma.users`: Exposes CRUD operations for the **users** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.users.findMany()
    * ```
    */
  get users(): Prisma.usersDelegate<GlobalReject>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = runtime.Types.Public.PrismaPromise<T>

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql

  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket


  /**
   * Prisma Client JS version: 4.13.0
   * Query Engine version: 1e7af066ee9cb95cf3a403c78d9aab3e6b04f37a
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON object.
   * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from. 
   */
  export type JsonObject = {[Key in string]?: JsonValue}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON array.
   */
  export interface JsonArray extends Array<JsonValue> {}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches any valid JSON value.
   */
  export type JsonValue = string | number | boolean | JsonObject | JsonArray | null

  /**
   * Matches a JSON object.
   * Unlike `JsonObject`, this type allows undefined and read-only properties.
   */
  export type InputJsonObject = {readonly [Key in string]?: InputJsonValue | null}

  /**
   * Matches a JSON array.
   * Unlike `JsonArray`, readonly arrays are assignable to this type.
   */
  export interface InputJsonArray extends ReadonlyArray<InputJsonValue | null> {}

  /**
   * Matches any valid value that can be used as an input for operations like
   * create and update as the value of a JSON field. Unlike `JsonValue`, this
   * type allows read-only arrays and read-only object properties and disallows
   * `null` at the top level.
   *
   * `null` cannot be used as the value of a JSON field because its meaning
   * would be ambiguous. Use `Prisma.JsonNull` to store the JSON null value or
   * `Prisma.DbNull` to clear the JSON value and set the field to the database
   * NULL value instead.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-by-null-values
   */
  export type InputJsonValue = string | number | boolean | InputJsonObject | InputJsonArray

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }
  type HasSelect = {
    select: any
  }
  type HasInclude = {
    include: any
  }
  type CheckSelect<T, S, U> = T extends SelectAndInclude
    ? 'Please either choose `select` or `include`'
    : T extends HasSelect
    ? U
    : T extends HasInclude
    ? U
    : S

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => Promise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;

  export function validator<V>(): <S>(select: runtime.Types.Utils.LegacyExact<S, V>) => S;

  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but with an array
   */
  type PickArray<T, K extends Array<keyof T>> = Prisma__Pick<T, TupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    akdata: 'akdata',
    users: 'users'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  export type DefaultPrismaClient = PrismaClient
  export type RejectOnNotFound = boolean | ((error: Error) => Error)
  export type RejectPerModel = { [P in ModelName]?: RejectOnNotFound }
  export type RejectPerOperation =  { [P in "findUnique" | "findFirst"]?: RejectPerModel | RejectOnNotFound } 
  type IsReject<T> = T extends true ? True : T extends (err: Error) => Error ? True : False
  export type HasReject<
    GlobalRejectSettings extends Prisma.PrismaClientOptions['rejectOnNotFound'],
    LocalRejectSettings,
    Action extends PrismaAction,
    Model extends ModelName
  > = LocalRejectSettings extends RejectOnNotFound
    ? IsReject<LocalRejectSettings>
    : GlobalRejectSettings extends RejectPerOperation
    ? Action extends keyof GlobalRejectSettings
      ? GlobalRejectSettings[Action] extends RejectOnNotFound
        ? IsReject<GlobalRejectSettings[Action]>
        : GlobalRejectSettings[Action] extends RejectPerModel
        ? Model extends keyof GlobalRejectSettings[Action]
          ? IsReject<GlobalRejectSettings[Action][Model]>
          : False
        : False
      : False
    : IsReject<GlobalRejectSettings>
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'

  export interface PrismaClientOptions {
    /**
     * Configure findUnique/findFirst to throw an error if the query returns null. 
     * @deprecated since 4.0.0. Use `findUniqueOrThrow`/`findFirstOrThrow` methods instead.
     * @example
     * ```
     * // Reject on both findUnique/findFirst
     * rejectOnNotFound: true
     * // Reject only on findFirst with a custom error
     * rejectOnNotFound: { findFirst: (err) => new Error("Custom Error")}
     * // Reject on user.findUnique with a custom error
     * rejectOnNotFound: { findUnique: {User: (err) => new Error("User not found")}}
     * ```
     */
    rejectOnNotFound?: RejectOnNotFound | RejectPerOperation
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources

    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat

    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: Array<LogLevel | LogDefinition>
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findMany'
    | 'findFirst'
    | 'create'
    | 'createMany'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => Promise<T>,
  ) => Promise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, '$connect' | '$disconnect' | '$on' | '$transaction' | '$use'>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */



  /**
   * Models
   */

  /**
   * Model AkPity
   */





  export type AkPitySelect = {
    standard?: boolean
    special?: boolean
  }


  export type AkPityGetPayload<S extends boolean | null | undefined | AkPityArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? AkPity :
    S extends undefined ? never :
    S extends { include: any } & (AkPityArgs)
    ? AkPity 
    : S extends { select: any } & (AkPityArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
    P extends keyof AkPity ? AkPity[P] : never
  } 
      : AkPity



  export interface AkPityDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {







  }

  /**
   * The delegate class that acts as a "Promise-like" for AkPity.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__AkPityClient<T, Null = never> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);


    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * AkPity without action
   */
  export type AkPityArgs = {
    /**
     * Select specific fields to fetch from the AkPity
     */
    select?: AkPitySelect | null
  }



  /**
   * Model AkSettings
   */





  export type AkSettingsSelect = {
    saveHistory?: boolean
    sendHistoryToDB?: boolean
    characterDatabase?: boolean
    clickToSelectOutcome?: boolean
    allowCombinations?: boolean
  }


  export type AkSettingsGetPayload<S extends boolean | null | undefined | AkSettingsArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? AkSettings :
    S extends undefined ? never :
    S extends { include: any } & (AkSettingsArgs)
    ? AkSettings 
    : S extends { select: any } & (AkSettingsArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
    P extends keyof AkSettings ? AkSettings[P] : never
  } 
      : AkSettings



  export interface AkSettingsDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {







  }

  /**
   * The delegate class that acts as a "Promise-like" for AkSettings.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__AkSettingsClient<T, Null = never> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);


    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * AkSettings without action
   */
  export type AkSettingsArgs = {
    /**
     * Select specific fields to fetch from the AkSettings
     */
    select?: AkSettingsSelect | null
  }



  /**
   * Model akdata
   */


  export type AggregateAkdata = {
    _count: AkdataCountAggregateOutputType | null
    _min: AkdataMinAggregateOutputType | null
    _max: AkdataMaxAggregateOutputType | null
  }

  export type AkdataMinAggregateOutputType = {
    id: string | null
    userId: string | null
  }

  export type AkdataMaxAggregateOutputType = {
    id: string | null
    userId: string | null
  }

  export type AkdataCountAggregateOutputType = {
    id: number
    history: number
    userId: number
    _all: number
  }


  export type AkdataMinAggregateInputType = {
    id?: true
    userId?: true
  }

  export type AkdataMaxAggregateInputType = {
    id?: true
    userId?: true
  }

  export type AkdataCountAggregateInputType = {
    id?: true
    history?: true
    userId?: true
    _all?: true
  }

  export type AkdataAggregateArgs = {
    /**
     * Filter which akdata to aggregate.
     */
    where?: akdataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of akdata to fetch.
     */
    orderBy?: Enumerable<akdataOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: akdataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` akdata from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` akdata.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned akdata
    **/
    _count?: true | AkdataCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AkdataMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AkdataMaxAggregateInputType
  }

  export type GetAkdataAggregateType<T extends AkdataAggregateArgs> = {
        [P in keyof T & keyof AggregateAkdata]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAkdata[P]>
      : GetScalarType<T[P], AggregateAkdata[P]>
  }




  export type AkdataGroupByArgs = {
    where?: akdataWhereInput
    orderBy?: Enumerable<akdataOrderByWithAggregationInput>
    by: AkdataScalarFieldEnum[]
    having?: akdataScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AkdataCountAggregateInputType | true
    _min?: AkdataMinAggregateInputType
    _max?: AkdataMaxAggregateInputType
  }


  export type AkdataGroupByOutputType = {
    id: string
    history: JsonValue
    userId: string | null
    _count: AkdataCountAggregateOutputType | null
    _min: AkdataMinAggregateOutputType | null
    _max: AkdataMaxAggregateOutputType | null
  }

  type GetAkdataGroupByPayload<T extends AkdataGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<AkdataGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AkdataGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AkdataGroupByOutputType[P]>
            : GetScalarType<T[P], AkdataGroupByOutputType[P]>
        }
      >
    >


  export type akdataSelect = {
    id?: boolean
    history?: boolean
    pity?: boolean | AkPityArgs
    settings?: boolean | AkSettingsArgs
    userId?: boolean
    user?: boolean | usersArgs
  }


  export type akdataInclude = {
    user?: boolean | usersArgs
  }

  export type akdataGetPayload<S extends boolean | null | undefined | akdataArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? akdata :
    S extends undefined ? never :
    S extends { include: any } & (akdataArgs | akdataFindManyArgs)
    ? akdata  & {
    [P in TruthyKeys<S['include']>]:
        P extends 'user' ? usersGetPayload<S['include'][P]> | null :  never
  } 
    : S extends { select: any } & (akdataArgs | akdataFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
        P extends 'pity' ? AkPityGetPayload<S['select'][P]> :
        P extends 'settings' ? AkSettingsGetPayload<S['select'][P]> :
        P extends 'user' ? usersGetPayload<S['select'][P]> | null :  P extends keyof akdata ? akdata[P] : never
  } 
      : akdata


  type akdataCountArgs = 
    Omit<akdataFindManyArgs, 'select' | 'include'> & {
      select?: AkdataCountAggregateInputType | true
    }

  export interface akdataDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {

    /**
     * Find zero or one Akdata that matches the filter.
     * @param {akdataFindUniqueArgs} args - Arguments to find a Akdata
     * @example
     * // Get one Akdata
     * const akdata = await prisma.akdata.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends akdataFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, akdataFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'akdata'> extends True ? Prisma__akdataClient<akdataGetPayload<T>> : Prisma__akdataClient<akdataGetPayload<T> | null, null>

    /**
     * Find one Akdata that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {akdataFindUniqueOrThrowArgs} args - Arguments to find a Akdata
     * @example
     * // Get one Akdata
     * const akdata = await prisma.akdata.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends akdataFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, akdataFindUniqueOrThrowArgs>
    ): Prisma__akdataClient<akdataGetPayload<T>>

    /**
     * Find the first Akdata that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {akdataFindFirstArgs} args - Arguments to find a Akdata
     * @example
     * // Get one Akdata
     * const akdata = await prisma.akdata.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends akdataFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, akdataFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'akdata'> extends True ? Prisma__akdataClient<akdataGetPayload<T>> : Prisma__akdataClient<akdataGetPayload<T> | null, null>

    /**
     * Find the first Akdata that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {akdataFindFirstOrThrowArgs} args - Arguments to find a Akdata
     * @example
     * // Get one Akdata
     * const akdata = await prisma.akdata.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends akdataFindFirstOrThrowArgs>(
      args?: SelectSubset<T, akdataFindFirstOrThrowArgs>
    ): Prisma__akdataClient<akdataGetPayload<T>>

    /**
     * Find zero or more Akdata that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {akdataFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Akdata
     * const akdata = await prisma.akdata.findMany()
     * 
     * // Get first 10 Akdata
     * const akdata = await prisma.akdata.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const akdataWithIdOnly = await prisma.akdata.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends akdataFindManyArgs>(
      args?: SelectSubset<T, akdataFindManyArgs>
    ): Prisma.PrismaPromise<Array<akdataGetPayload<T>>>

    /**
     * Create a Akdata.
     * @param {akdataCreateArgs} args - Arguments to create a Akdata.
     * @example
     * // Create one Akdata
     * const Akdata = await prisma.akdata.create({
     *   data: {
     *     // ... data to create a Akdata
     *   }
     * })
     * 
    **/
    create<T extends akdataCreateArgs>(
      args: SelectSubset<T, akdataCreateArgs>
    ): Prisma__akdataClient<akdataGetPayload<T>>

    /**
     * Create many Akdata.
     *     @param {akdataCreateManyArgs} args - Arguments to create many Akdata.
     *     @example
     *     // Create many Akdata
     *     const akdata = await prisma.akdata.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends akdataCreateManyArgs>(
      args?: SelectSubset<T, akdataCreateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Akdata.
     * @param {akdataDeleteArgs} args - Arguments to delete one Akdata.
     * @example
     * // Delete one Akdata
     * const Akdata = await prisma.akdata.delete({
     *   where: {
     *     // ... filter to delete one Akdata
     *   }
     * })
     * 
    **/
    delete<T extends akdataDeleteArgs>(
      args: SelectSubset<T, akdataDeleteArgs>
    ): Prisma__akdataClient<akdataGetPayload<T>>

    /**
     * Update one Akdata.
     * @param {akdataUpdateArgs} args - Arguments to update one Akdata.
     * @example
     * // Update one Akdata
     * const akdata = await prisma.akdata.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends akdataUpdateArgs>(
      args: SelectSubset<T, akdataUpdateArgs>
    ): Prisma__akdataClient<akdataGetPayload<T>>

    /**
     * Delete zero or more Akdata.
     * @param {akdataDeleteManyArgs} args - Arguments to filter Akdata to delete.
     * @example
     * // Delete a few Akdata
     * const { count } = await prisma.akdata.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends akdataDeleteManyArgs>(
      args?: SelectSubset<T, akdataDeleteManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Akdata.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {akdataUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Akdata
     * const akdata = await prisma.akdata.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends akdataUpdateManyArgs>(
      args: SelectSubset<T, akdataUpdateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Akdata.
     * @param {akdataUpsertArgs} args - Arguments to update or create a Akdata.
     * @example
     * // Update or create a Akdata
     * const akdata = await prisma.akdata.upsert({
     *   create: {
     *     // ... data to create a Akdata
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Akdata we want to update
     *   }
     * })
    **/
    upsert<T extends akdataUpsertArgs>(
      args: SelectSubset<T, akdataUpsertArgs>
    ): Prisma__akdataClient<akdataGetPayload<T>>

    /**
     * Find zero or more Akdata that matches the filter.
     * @param {akdataFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const akdata = await prisma.akdata.findRaw({
     *   filter: { age: { $gt: 25 } } 
     * })
    **/
    findRaw(
      args?: akdataFindRawArgs
    ): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Akdata.
     * @param {akdataAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const akdata = await prisma.akdata.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
    **/
    aggregateRaw(
      args?: akdataAggregateRawArgs
    ): Prisma.PrismaPromise<JsonObject>

    /**
     * Count the number of Akdata.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {akdataCountArgs} args - Arguments to filter Akdata to count.
     * @example
     * // Count the number of Akdata
     * const count = await prisma.akdata.count({
     *   where: {
     *     // ... the filter for the Akdata we want to count
     *   }
     * })
    **/
    count<T extends akdataCountArgs>(
      args?: Subset<T, akdataCountArgs>,
    ): Prisma.PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AkdataCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Akdata.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AkdataAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AkdataAggregateArgs>(args: Subset<T, AkdataAggregateArgs>): Prisma.PrismaPromise<GetAkdataAggregateType<T>>

    /**
     * Group by Akdata.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AkdataGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AkdataGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AkdataGroupByArgs['orderBy'] }
        : { orderBy?: AkdataGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AkdataGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAkdataGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for akdata.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__akdataClient<T, Null = never> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);

    pity<T extends AkPityArgs= {}>(args?: Subset<T, AkPityArgs>): Prisma__AkPityClient<AkPityGetPayload<T> | Null>;

    settings<T extends AkSettingsArgs= {}>(args?: Subset<T, AkSettingsArgs>): Prisma__AkSettingsClient<AkSettingsGetPayload<T> | Null>;

    user<T extends usersArgs= {}>(args?: Subset<T, usersArgs>): Prisma__usersClient<usersGetPayload<T> | Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * akdata base type for findUnique actions
   */
  export type akdataFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the akdata
     */
    select?: akdataSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: akdataInclude | null
    /**
     * Filter, which akdata to fetch.
     */
    where: akdataWhereUniqueInput
  }

  /**
   * akdata findUnique
   */
  export interface akdataFindUniqueArgs extends akdataFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * akdata findUniqueOrThrow
   */
  export type akdataFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the akdata
     */
    select?: akdataSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: akdataInclude | null
    /**
     * Filter, which akdata to fetch.
     */
    where: akdataWhereUniqueInput
  }


  /**
   * akdata base type for findFirst actions
   */
  export type akdataFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the akdata
     */
    select?: akdataSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: akdataInclude | null
    /**
     * Filter, which akdata to fetch.
     */
    where?: akdataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of akdata to fetch.
     */
    orderBy?: Enumerable<akdataOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for akdata.
     */
    cursor?: akdataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` akdata from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` akdata.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of akdata.
     */
    distinct?: Enumerable<AkdataScalarFieldEnum>
  }

  /**
   * akdata findFirst
   */
  export interface akdataFindFirstArgs extends akdataFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * akdata findFirstOrThrow
   */
  export type akdataFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the akdata
     */
    select?: akdataSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: akdataInclude | null
    /**
     * Filter, which akdata to fetch.
     */
    where?: akdataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of akdata to fetch.
     */
    orderBy?: Enumerable<akdataOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for akdata.
     */
    cursor?: akdataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` akdata from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` akdata.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of akdata.
     */
    distinct?: Enumerable<AkdataScalarFieldEnum>
  }


  /**
   * akdata findMany
   */
  export type akdataFindManyArgs = {
    /**
     * Select specific fields to fetch from the akdata
     */
    select?: akdataSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: akdataInclude | null
    /**
     * Filter, which akdata to fetch.
     */
    where?: akdataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of akdata to fetch.
     */
    orderBy?: Enumerable<akdataOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing akdata.
     */
    cursor?: akdataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` akdata from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` akdata.
     */
    skip?: number
    distinct?: Enumerable<AkdataScalarFieldEnum>
  }


  /**
   * akdata create
   */
  export type akdataCreateArgs = {
    /**
     * Select specific fields to fetch from the akdata
     */
    select?: akdataSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: akdataInclude | null
    /**
     * The data needed to create a akdata.
     */
    data: XOR<akdataCreateInput, akdataUncheckedCreateInput>
  }


  /**
   * akdata createMany
   */
  export type akdataCreateManyArgs = {
    /**
     * The data used to create many akdata.
     */
    data: Enumerable<akdataCreateManyInput>
  }


  /**
   * akdata update
   */
  export type akdataUpdateArgs = {
    /**
     * Select specific fields to fetch from the akdata
     */
    select?: akdataSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: akdataInclude | null
    /**
     * The data needed to update a akdata.
     */
    data: XOR<akdataUpdateInput, akdataUncheckedUpdateInput>
    /**
     * Choose, which akdata to update.
     */
    where: akdataWhereUniqueInput
  }


  /**
   * akdata updateMany
   */
  export type akdataUpdateManyArgs = {
    /**
     * The data used to update akdata.
     */
    data: XOR<akdataUpdateManyMutationInput, akdataUncheckedUpdateManyInput>
    /**
     * Filter which akdata to update
     */
    where?: akdataWhereInput
  }


  /**
   * akdata upsert
   */
  export type akdataUpsertArgs = {
    /**
     * Select specific fields to fetch from the akdata
     */
    select?: akdataSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: akdataInclude | null
    /**
     * The filter to search for the akdata to update in case it exists.
     */
    where: akdataWhereUniqueInput
    /**
     * In case the akdata found by the `where` argument doesn't exist, create a new akdata with this data.
     */
    create: XOR<akdataCreateInput, akdataUncheckedCreateInput>
    /**
     * In case the akdata was found with the provided `where` argument, update it with this data.
     */
    update: XOR<akdataUpdateInput, akdataUncheckedUpdateInput>
  }


  /**
   * akdata delete
   */
  export type akdataDeleteArgs = {
    /**
     * Select specific fields to fetch from the akdata
     */
    select?: akdataSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: akdataInclude | null
    /**
     * Filter which akdata to delete.
     */
    where: akdataWhereUniqueInput
  }


  /**
   * akdata deleteMany
   */
  export type akdataDeleteManyArgs = {
    /**
     * Filter which akdata to delete
     */
    where?: akdataWhereInput
  }


  /**
   * akdata findRaw
   */
  export type akdataFindRawArgs = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }


  /**
   * akdata aggregateRaw
   */
  export type akdataAggregateRawArgs = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }


  /**
   * akdata without action
   */
  export type akdataArgs = {
    /**
     * Select specific fields to fetch from the akdata
     */
    select?: akdataSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: akdataInclude | null
  }



  /**
   * Model users
   */


  export type AggregateUsers = {
    _count: UsersCountAggregateOutputType | null
    _min: UsersMinAggregateOutputType | null
    _max: UsersMaxAggregateOutputType | null
  }

  export type UsersMinAggregateOutputType = {
    id: string | null
    username: string | null
    pass: string | null
  }

  export type UsersMaxAggregateOutputType = {
    id: string | null
    username: string | null
    pass: string | null
  }

  export type UsersCountAggregateOutputType = {
    id: number
    username: number
    pass: number
    _all: number
  }


  export type UsersMinAggregateInputType = {
    id?: true
    username?: true
    pass?: true
  }

  export type UsersMaxAggregateInputType = {
    id?: true
    username?: true
    pass?: true
  }

  export type UsersCountAggregateInputType = {
    id?: true
    username?: true
    pass?: true
    _all?: true
  }

  export type UsersAggregateArgs = {
    /**
     * Filter which users to aggregate.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: Enumerable<usersOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned users
    **/
    _count?: true | UsersCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UsersMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UsersMaxAggregateInputType
  }

  export type GetUsersAggregateType<T extends UsersAggregateArgs> = {
        [P in keyof T & keyof AggregateUsers]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUsers[P]>
      : GetScalarType<T[P], AggregateUsers[P]>
  }




  export type UsersGroupByArgs = {
    where?: usersWhereInput
    orderBy?: Enumerable<usersOrderByWithAggregationInput>
    by: UsersScalarFieldEnum[]
    having?: usersScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UsersCountAggregateInputType | true
    _min?: UsersMinAggregateInputType
    _max?: UsersMaxAggregateInputType
  }


  export type UsersGroupByOutputType = {
    id: string
    username: string
    pass: string
    _count: UsersCountAggregateOutputType | null
    _min: UsersMinAggregateOutputType | null
    _max: UsersMaxAggregateOutputType | null
  }

  type GetUsersGroupByPayload<T extends UsersGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<UsersGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UsersGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UsersGroupByOutputType[P]>
            : GetScalarType<T[P], UsersGroupByOutputType[P]>
        }
      >
    >


  export type usersSelect = {
    id?: boolean
    username?: boolean
    pass?: boolean
    akdata?: boolean | akdataArgs
  }


  export type usersInclude = {
    akdata?: boolean | akdataArgs
  }

  export type usersGetPayload<S extends boolean | null | undefined | usersArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? users :
    S extends undefined ? never :
    S extends { include: any } & (usersArgs | usersFindManyArgs)
    ? users  & {
    [P in TruthyKeys<S['include']>]:
        P extends 'akdata' ? akdataGetPayload<S['include'][P]> | null :  never
  } 
    : S extends { select: any } & (usersArgs | usersFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
        P extends 'akdata' ? akdataGetPayload<S['select'][P]> | null :  P extends keyof users ? users[P] : never
  } 
      : users


  type usersCountArgs = 
    Omit<usersFindManyArgs, 'select' | 'include'> & {
      select?: UsersCountAggregateInputType | true
    }

  export interface usersDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {

    /**
     * Find zero or one Users that matches the filter.
     * @param {usersFindUniqueArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends usersFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, usersFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'users'> extends True ? Prisma__usersClient<usersGetPayload<T>> : Prisma__usersClient<usersGetPayload<T> | null, null>

    /**
     * Find one Users that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {usersFindUniqueOrThrowArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends usersFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, usersFindUniqueOrThrowArgs>
    ): Prisma__usersClient<usersGetPayload<T>>

    /**
     * Find the first Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersFindFirstArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends usersFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, usersFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'users'> extends True ? Prisma__usersClient<usersGetPayload<T>> : Prisma__usersClient<usersGetPayload<T> | null, null>

    /**
     * Find the first Users that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersFindFirstOrThrowArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends usersFindFirstOrThrowArgs>(
      args?: SelectSubset<T, usersFindFirstOrThrowArgs>
    ): Prisma__usersClient<usersGetPayload<T>>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.users.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.users.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const usersWithIdOnly = await prisma.users.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends usersFindManyArgs>(
      args?: SelectSubset<T, usersFindManyArgs>
    ): Prisma.PrismaPromise<Array<usersGetPayload<T>>>

    /**
     * Create a Users.
     * @param {usersCreateArgs} args - Arguments to create a Users.
     * @example
     * // Create one Users
     * const Users = await prisma.users.create({
     *   data: {
     *     // ... data to create a Users
     *   }
     * })
     * 
    **/
    create<T extends usersCreateArgs>(
      args: SelectSubset<T, usersCreateArgs>
    ): Prisma__usersClient<usersGetPayload<T>>

    /**
     * Create many Users.
     *     @param {usersCreateManyArgs} args - Arguments to create many Users.
     *     @example
     *     // Create many Users
     *     const users = await prisma.users.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends usersCreateManyArgs>(
      args?: SelectSubset<T, usersCreateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Users.
     * @param {usersDeleteArgs} args - Arguments to delete one Users.
     * @example
     * // Delete one Users
     * const Users = await prisma.users.delete({
     *   where: {
     *     // ... filter to delete one Users
     *   }
     * })
     * 
    **/
    delete<T extends usersDeleteArgs>(
      args: SelectSubset<T, usersDeleteArgs>
    ): Prisma__usersClient<usersGetPayload<T>>

    /**
     * Update one Users.
     * @param {usersUpdateArgs} args - Arguments to update one Users.
     * @example
     * // Update one Users
     * const users = await prisma.users.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends usersUpdateArgs>(
      args: SelectSubset<T, usersUpdateArgs>
    ): Prisma__usersClient<usersGetPayload<T>>

    /**
     * Delete zero or more Users.
     * @param {usersDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.users.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends usersDeleteManyArgs>(
      args?: SelectSubset<T, usersDeleteManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const users = await prisma.users.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends usersUpdateManyArgs>(
      args: SelectSubset<T, usersUpdateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Users.
     * @param {usersUpsertArgs} args - Arguments to update or create a Users.
     * @example
     * // Update or create a Users
     * const users = await prisma.users.upsert({
     *   create: {
     *     // ... data to create a Users
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Users we want to update
     *   }
     * })
    **/
    upsert<T extends usersUpsertArgs>(
      args: SelectSubset<T, usersUpsertArgs>
    ): Prisma__usersClient<usersGetPayload<T>>

    /**
     * Find zero or more Users that matches the filter.
     * @param {usersFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const users = await prisma.users.findRaw({
     *   filter: { age: { $gt: 25 } } 
     * })
    **/
    findRaw(
      args?: usersFindRawArgs
    ): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Users.
     * @param {usersAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const users = await prisma.users.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
    **/
    aggregateRaw(
      args?: usersAggregateRawArgs
    ): Prisma.PrismaPromise<JsonObject>

    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.users.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends usersCountArgs>(
      args?: Subset<T, usersCountArgs>,
    ): Prisma.PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UsersCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsersAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UsersAggregateArgs>(args: Subset<T, UsersAggregateArgs>): Prisma.PrismaPromise<GetUsersAggregateType<T>>

    /**
     * Group by Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsersGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UsersGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UsersGroupByArgs['orderBy'] }
        : { orderBy?: UsersGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UsersGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUsersGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for users.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__usersClient<T, Null = never> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);

    akdata<T extends akdataArgs= {}>(args?: Subset<T, akdataArgs>): Prisma__akdataClient<akdataGetPayload<T> | Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * users base type for findUnique actions
   */
  export type usersFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: usersInclude | null
    /**
     * Filter, which users to fetch.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users findUnique
   */
  export interface usersFindUniqueArgs extends usersFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * users findUniqueOrThrow
   */
  export type usersFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: usersInclude | null
    /**
     * Filter, which users to fetch.
     */
    where: usersWhereUniqueInput
  }


  /**
   * users base type for findFirst actions
   */
  export type usersFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: usersInclude | null
    /**
     * Filter, which users to fetch.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: Enumerable<usersOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for users.
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of users.
     */
    distinct?: Enumerable<UsersScalarFieldEnum>
  }

  /**
   * users findFirst
   */
  export interface usersFindFirstArgs extends usersFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * users findFirstOrThrow
   */
  export type usersFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: usersInclude | null
    /**
     * Filter, which users to fetch.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: Enumerable<usersOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for users.
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of users.
     */
    distinct?: Enumerable<UsersScalarFieldEnum>
  }


  /**
   * users findMany
   */
  export type usersFindManyArgs = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: usersInclude | null
    /**
     * Filter, which users to fetch.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: Enumerable<usersOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing users.
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    distinct?: Enumerable<UsersScalarFieldEnum>
  }


  /**
   * users create
   */
  export type usersCreateArgs = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: usersInclude | null
    /**
     * The data needed to create a users.
     */
    data: XOR<usersCreateInput, usersUncheckedCreateInput>
  }


  /**
   * users createMany
   */
  export type usersCreateManyArgs = {
    /**
     * The data used to create many users.
     */
    data: Enumerable<usersCreateManyInput>
  }


  /**
   * users update
   */
  export type usersUpdateArgs = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: usersInclude | null
    /**
     * The data needed to update a users.
     */
    data: XOR<usersUpdateInput, usersUncheckedUpdateInput>
    /**
     * Choose, which users to update.
     */
    where: usersWhereUniqueInput
  }


  /**
   * users updateMany
   */
  export type usersUpdateManyArgs = {
    /**
     * The data used to update users.
     */
    data: XOR<usersUpdateManyMutationInput, usersUncheckedUpdateManyInput>
    /**
     * Filter which users to update
     */
    where?: usersWhereInput
  }


  /**
   * users upsert
   */
  export type usersUpsertArgs = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: usersInclude | null
    /**
     * The filter to search for the users to update in case it exists.
     */
    where: usersWhereUniqueInput
    /**
     * In case the users found by the `where` argument doesn't exist, create a new users with this data.
     */
    create: XOR<usersCreateInput, usersUncheckedCreateInput>
    /**
     * In case the users was found with the provided `where` argument, update it with this data.
     */
    update: XOR<usersUpdateInput, usersUncheckedUpdateInput>
  }


  /**
   * users delete
   */
  export type usersDeleteArgs = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: usersInclude | null
    /**
     * Filter which users to delete.
     */
    where: usersWhereUniqueInput
  }


  /**
   * users deleteMany
   */
  export type usersDeleteManyArgs = {
    /**
     * Filter which users to delete
     */
    where?: usersWhereInput
  }


  /**
   * users findRaw
   */
  export type usersFindRawArgs = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }


  /**
   * users aggregateRaw
   */
  export type usersAggregateRawArgs = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }


  /**
   * users without action
   */
  export type usersArgs = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: usersInclude | null
  }



  /**
   * Enums
   */

  // Based on
  // https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

  export const AkdataScalarFieldEnum: {
    id: 'id',
    history: 'history',
    userId: 'userId'
  };

  export type AkdataScalarFieldEnum = (typeof AkdataScalarFieldEnum)[keyof typeof AkdataScalarFieldEnum]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const UsersScalarFieldEnum: {
    id: 'id',
    username: 'username',
    pass: 'pass'
  };

  export type UsersScalarFieldEnum = (typeof UsersScalarFieldEnum)[keyof typeof UsersScalarFieldEnum]


  /**
   * Deep Input Types
   */


  export type akdataWhereInput = {
    AND?: Enumerable<akdataWhereInput>
    OR?: Enumerable<akdataWhereInput>
    NOT?: Enumerable<akdataWhereInput>
    id?: StringFilter | string
    history?: JsonFilter
    pity?: XOR<AkPityCompositeFilter, AkPityObjectEqualityInput>
    settings?: XOR<AkSettingsCompositeFilter, AkSettingsObjectEqualityInput>
    userId?: StringNullableFilter | string | null
    user?: XOR<UsersRelationFilter, usersWhereInput> | null
  }

  export type akdataOrderByWithRelationInput = {
    id?: SortOrder
    history?: SortOrder
    pity?: AkPityOrderByInput
    settings?: AkSettingsOrderByInput
    userId?: SortOrder
    user?: usersOrderByWithRelationInput
  }

  export type akdataWhereUniqueInput = {
    id?: string
    userId?: string
  }

  export type akdataOrderByWithAggregationInput = {
    id?: SortOrder
    history?: SortOrder
    userId?: SortOrder
    _count?: akdataCountOrderByAggregateInput
    _max?: akdataMaxOrderByAggregateInput
    _min?: akdataMinOrderByAggregateInput
  }

  export type akdataScalarWhereWithAggregatesInput = {
    AND?: Enumerable<akdataScalarWhereWithAggregatesInput>
    OR?: Enumerable<akdataScalarWhereWithAggregatesInput>
    NOT?: Enumerable<akdataScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    history?: JsonWithAggregatesFilter
    userId?: StringNullableWithAggregatesFilter | string | null
  }

  export type usersWhereInput = {
    AND?: Enumerable<usersWhereInput>
    OR?: Enumerable<usersWhereInput>
    NOT?: Enumerable<usersWhereInput>
    id?: StringFilter | string
    username?: StringFilter | string
    pass?: StringFilter | string
    akdata?: XOR<AkdataRelationFilter, akdataWhereInput> | null
  }

  export type usersOrderByWithRelationInput = {
    id?: SortOrder
    username?: SortOrder
    pass?: SortOrder
    akdata?: akdataOrderByWithRelationInput
  }

  export type usersWhereUniqueInput = {
    id?: string
    username?: string
  }

  export type usersOrderByWithAggregationInput = {
    id?: SortOrder
    username?: SortOrder
    pass?: SortOrder
    _count?: usersCountOrderByAggregateInput
    _max?: usersMaxOrderByAggregateInput
    _min?: usersMinOrderByAggregateInput
  }

  export type usersScalarWhereWithAggregatesInput = {
    AND?: Enumerable<usersScalarWhereWithAggregatesInput>
    OR?: Enumerable<usersScalarWhereWithAggregatesInput>
    NOT?: Enumerable<usersScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    username?: StringWithAggregatesFilter | string
    pass?: StringWithAggregatesFilter | string
  }

  export type akdataCreateInput = {
    id?: string
    history: InputJsonValue
    pity: XOR<AkPityCreateEnvelopeInput, AkPityCreateInput>
    settings: XOR<AkSettingsCreateEnvelopeInput, AkSettingsCreateInput>
    user?: usersCreateNestedOneWithoutAkdataInput
  }

  export type akdataUncheckedCreateInput = {
    id?: string
    history: InputJsonValue
    pity: XOR<AkPityCreateEnvelopeInput, AkPityCreateInput>
    settings: XOR<AkSettingsCreateEnvelopeInput, AkSettingsCreateInput>
    userId?: string | null
  }

  export type akdataUpdateInput = {
    history?: InputJsonValue | InputJsonValue
    pity?: XOR<AkPityUpdateEnvelopeInput, AkPityCreateInput>
    settings?: XOR<AkSettingsUpdateEnvelopeInput, AkSettingsCreateInput>
    user?: usersUpdateOneWithoutAkdataNestedInput
  }

  export type akdataUncheckedUpdateInput = {
    history?: InputJsonValue | InputJsonValue
    pity?: XOR<AkPityUpdateEnvelopeInput, AkPityCreateInput>
    settings?: XOR<AkSettingsUpdateEnvelopeInput, AkSettingsCreateInput>
    userId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type akdataCreateManyInput = {
    id?: string
    history: InputJsonValue
    pity: XOR<AkPityCreateEnvelopeInput, AkPityCreateInput>
    settings: XOR<AkSettingsCreateEnvelopeInput, AkSettingsCreateInput>
    userId?: string | null
  }

  export type akdataUpdateManyMutationInput = {
    history?: InputJsonValue | InputJsonValue
    pity?: XOR<AkPityUpdateEnvelopeInput, AkPityCreateInput>
    settings?: XOR<AkSettingsUpdateEnvelopeInput, AkSettingsCreateInput>
  }

  export type akdataUncheckedUpdateManyInput = {
    history?: InputJsonValue | InputJsonValue
    pity?: XOR<AkPityUpdateEnvelopeInput, AkPityCreateInput>
    settings?: XOR<AkSettingsUpdateEnvelopeInput, AkSettingsCreateInput>
    userId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type usersCreateInput = {
    id?: string
    username: string
    pass?: string
    akdata?: akdataCreateNestedOneWithoutUserInput
  }

  export type usersUncheckedCreateInput = {
    id?: string
    username: string
    pass?: string
    akdata?: akdataUncheckedCreateNestedOneWithoutUserInput
  }

  export type usersUpdateInput = {
    username?: StringFieldUpdateOperationsInput | string
    pass?: StringFieldUpdateOperationsInput | string
    akdata?: akdataUpdateOneWithoutUserNestedInput
  }

  export type usersUncheckedUpdateInput = {
    username?: StringFieldUpdateOperationsInput | string
    pass?: StringFieldUpdateOperationsInput | string
    akdata?: akdataUncheckedUpdateOneWithoutUserNestedInput
  }

  export type usersCreateManyInput = {
    id?: string
    username: string
    pass?: string
  }

  export type usersUpdateManyMutationInput = {
    username?: StringFieldUpdateOperationsInput | string
    pass?: StringFieldUpdateOperationsInput | string
  }

  export type usersUncheckedUpdateManyInput = {
    username?: StringFieldUpdateOperationsInput | string
    pass?: StringFieldUpdateOperationsInput | string
  }

  export type StringFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringFilter | string
  }
  export type JsonFilter = 
    | PatchUndefined<
        Either<Required<JsonFilterBase>, Exclude<keyof Required<JsonFilterBase>, 'path'>>,
        Required<JsonFilterBase>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase>, 'path'>>

  export type JsonFilterBase = {
    equals?: InputJsonValue
    not?: InputJsonValue
  }

  export type AkPityCompositeFilter = {
    equals?: AkPityObjectEqualityInput
    is?: AkPityWhereInput
    isNot?: AkPityWhereInput
  }

  export type AkPityObjectEqualityInput = {
    standard: number
    special?: Enumerable<InputJsonValue>
  }

  export type AkSettingsCompositeFilter = {
    equals?: AkSettingsObjectEqualityInput
    is?: AkSettingsWhereInput
    isNot?: AkSettingsWhereInput
  }

  export type AkSettingsObjectEqualityInput = {
    saveHistory: boolean
    sendHistoryToDB: boolean
    characterDatabase: boolean
    clickToSelectOutcome: boolean
    allowCombinations: boolean
  }

  export type StringNullableFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringNullableFilter | string | null
    isSet?: boolean
  }

  export type UsersRelationFilter = {
    is?: usersWhereInput | null
    isNot?: usersWhereInput | null
  }

  export type AkPityOrderByInput = {
    standard?: SortOrder
    special?: SortOrder
  }

  export type AkSettingsOrderByInput = {
    saveHistory?: SortOrder
    sendHistoryToDB?: SortOrder
    characterDatabase?: SortOrder
    clickToSelectOutcome?: SortOrder
    allowCombinations?: SortOrder
  }

  export type akdataCountOrderByAggregateInput = {
    id?: SortOrder
    history?: SortOrder
    userId?: SortOrder
  }

  export type akdataMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type akdataMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type StringWithAggregatesFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter | string
    _count?: NestedIntFilter
    _min?: NestedStringFilter
    _max?: NestedStringFilter
  }
  export type JsonWithAggregatesFilter = 
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase>, Exclude<keyof Required<JsonWithAggregatesFilterBase>, 'path'>>,
        Required<JsonWithAggregatesFilterBase>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase>, 'path'>>

  export type JsonWithAggregatesFilterBase = {
    equals?: InputJsonValue
    not?: InputJsonValue
    _count?: NestedIntFilter
    _min?: NestedJsonFilter
    _max?: NestedJsonFilter
  }

  export type StringNullableWithAggregatesFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedStringNullableFilter
    _max?: NestedStringNullableFilter
    isSet?: boolean
  }

  export type AkdataRelationFilter = {
    is?: akdataWhereInput | null
    isNot?: akdataWhereInput | null
  }

  export type usersCountOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    pass?: SortOrder
  }

  export type usersMaxOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    pass?: SortOrder
  }

  export type usersMinOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    pass?: SortOrder
  }

  export type AkPityCreateEnvelopeInput = {
    set?: AkPityCreateInput
  }

  export type AkPityCreateInput = {
    standard: number
    special?: AkPityCreatespecialInput | Enumerable<InputJsonValue>
  }

  export type AkSettingsCreateEnvelopeInput = {
    set?: AkSettingsCreateInput
  }

  export type AkSettingsCreateInput = {
    saveHistory?: boolean
    sendHistoryToDB?: boolean
    characterDatabase?: boolean
    clickToSelectOutcome?: boolean
    allowCombinations?: boolean
  }

  export type usersCreateNestedOneWithoutAkdataInput = {
    create?: XOR<usersCreateWithoutAkdataInput, usersUncheckedCreateWithoutAkdataInput>
    connectOrCreate?: usersCreateOrConnectWithoutAkdataInput
    connect?: usersWhereUniqueInput
  }

  export type AkPityUpdateEnvelopeInput = {
    set?: AkPityCreateInput
    update?: AkPityUpdateInput
  }

  export type AkSettingsUpdateEnvelopeInput = {
    set?: AkSettingsCreateInput
    update?: AkSettingsUpdateInput
  }

  export type usersUpdateOneWithoutAkdataNestedInput = {
    create?: XOR<usersCreateWithoutAkdataInput, usersUncheckedCreateWithoutAkdataInput>
    connectOrCreate?: usersCreateOrConnectWithoutAkdataInput
    upsert?: usersUpsertWithoutAkdataInput
    disconnect?: boolean
    delete?: boolean
    connect?: usersWhereUniqueInput
    update?: XOR<usersUpdateWithoutAkdataInput, usersUncheckedUpdateWithoutAkdataInput>
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
    unset?: boolean
  }

  export type akdataCreateNestedOneWithoutUserInput = {
    create?: XOR<akdataCreateWithoutUserInput, akdataUncheckedCreateWithoutUserInput>
    connectOrCreate?: akdataCreateOrConnectWithoutUserInput
    connect?: akdataWhereUniqueInput
  }

  export type akdataUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<akdataCreateWithoutUserInput, akdataUncheckedCreateWithoutUserInput>
    connectOrCreate?: akdataCreateOrConnectWithoutUserInput
    connect?: akdataWhereUniqueInput
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type akdataUpdateOneWithoutUserNestedInput = {
    create?: XOR<akdataCreateWithoutUserInput, akdataUncheckedCreateWithoutUserInput>
    connectOrCreate?: akdataCreateOrConnectWithoutUserInput
    upsert?: akdataUpsertWithoutUserInput
    disconnect?: boolean
    delete?: boolean
    connect?: akdataWhereUniqueInput
    update?: XOR<akdataUpdateWithoutUserInput, akdataUncheckedUpdateWithoutUserInput>
  }

  export type akdataUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<akdataCreateWithoutUserInput, akdataUncheckedCreateWithoutUserInput>
    connectOrCreate?: akdataCreateOrConnectWithoutUserInput
    upsert?: akdataUpsertWithoutUserInput
    disconnect?: boolean
    delete?: boolean
    connect?: akdataWhereUniqueInput
    update?: XOR<akdataUpdateWithoutUserInput, akdataUncheckedUpdateWithoutUserInput>
  }

  export type NestedStringFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringFilter | string
  }

  export type AkPityWhereInput = {
    AND?: Enumerable<AkPityWhereInput>
    OR?: Enumerable<AkPityWhereInput>
    NOT?: Enumerable<AkPityWhereInput>
    standard?: IntFilter | number
    special?: JsonNullableListFilter
  }

  export type AkSettingsWhereInput = {
    AND?: Enumerable<AkSettingsWhereInput>
    OR?: Enumerable<AkSettingsWhereInput>
    NOT?: Enumerable<AkSettingsWhereInput>
    saveHistory?: BoolFilter | boolean
    sendHistoryToDB?: BoolFilter | boolean
    characterDatabase?: BoolFilter | boolean
    clickToSelectOutcome?: BoolFilter | boolean
    allowCombinations?: BoolFilter | boolean
  }

  export type NestedStringNullableFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringNullableFilter | string | null
    isSet?: boolean
  }

  export type NestedStringWithAggregatesFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringWithAggregatesFilter | string
    _count?: NestedIntFilter
    _min?: NestedStringFilter
    _max?: NestedStringFilter
  }

  export type NestedIntFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntFilter | number
  }
  export type NestedJsonFilter = 
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase>, Exclude<keyof Required<NestedJsonFilterBase>, 'path'>>,
        Required<NestedJsonFilterBase>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase>, 'path'>>

  export type NestedJsonFilterBase = {
    equals?: InputJsonValue
    not?: InputJsonValue
  }

  export type NestedStringNullableWithAggregatesFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringNullableWithAggregatesFilter | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedStringNullableFilter
    _max?: NestedStringNullableFilter
    isSet?: boolean
  }

  export type NestedIntNullableFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableFilter | number | null
    isSet?: boolean
  }

  export type AkPityCreatespecialInput = {
    set: Enumerable<InputJsonValue>
  }

  export type usersCreateWithoutAkdataInput = {
    id?: string
    username: string
    pass?: string
  }

  export type usersUncheckedCreateWithoutAkdataInput = {
    id?: string
    username: string
    pass?: string
  }

  export type usersCreateOrConnectWithoutAkdataInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutAkdataInput, usersUncheckedCreateWithoutAkdataInput>
  }

  export type AkPityUpdateInput = {
    standard?: IntFieldUpdateOperationsInput | number
    special?: AkPityUpdatespecialInput | Enumerable<InputJsonValue>
  }

  export type AkSettingsUpdateInput = {
    saveHistory?: BoolFieldUpdateOperationsInput | boolean
    sendHistoryToDB?: BoolFieldUpdateOperationsInput | boolean
    characterDatabase?: BoolFieldUpdateOperationsInput | boolean
    clickToSelectOutcome?: BoolFieldUpdateOperationsInput | boolean
    allowCombinations?: BoolFieldUpdateOperationsInput | boolean
  }

  export type usersUpsertWithoutAkdataInput = {
    update: XOR<usersUpdateWithoutAkdataInput, usersUncheckedUpdateWithoutAkdataInput>
    create: XOR<usersCreateWithoutAkdataInput, usersUncheckedCreateWithoutAkdataInput>
  }

  export type usersUpdateWithoutAkdataInput = {
    username?: StringFieldUpdateOperationsInput | string
    pass?: StringFieldUpdateOperationsInput | string
  }

  export type usersUncheckedUpdateWithoutAkdataInput = {
    username?: StringFieldUpdateOperationsInput | string
    pass?: StringFieldUpdateOperationsInput | string
  }

  export type akdataCreateWithoutUserInput = {
    id?: string
    history: InputJsonValue
    pity: XOR<AkPityCreateEnvelopeInput, AkPityCreateInput>
    settings: XOR<AkSettingsCreateEnvelopeInput, AkSettingsCreateInput>
  }

  export type akdataUncheckedCreateWithoutUserInput = {
    id?: string
    history: InputJsonValue
    pity: XOR<AkPityCreateEnvelopeInput, AkPityCreateInput>
    settings: XOR<AkSettingsCreateEnvelopeInput, AkSettingsCreateInput>
  }

  export type akdataCreateOrConnectWithoutUserInput = {
    where: akdataWhereUniqueInput
    create: XOR<akdataCreateWithoutUserInput, akdataUncheckedCreateWithoutUserInput>
  }

  export type akdataUpsertWithoutUserInput = {
    update: XOR<akdataUpdateWithoutUserInput, akdataUncheckedUpdateWithoutUserInput>
    create: XOR<akdataCreateWithoutUserInput, akdataUncheckedCreateWithoutUserInput>
  }

  export type akdataUpdateWithoutUserInput = {
    history?: InputJsonValue | InputJsonValue
    pity?: XOR<AkPityUpdateEnvelopeInput, AkPityCreateInput>
    settings?: XOR<AkSettingsUpdateEnvelopeInput, AkSettingsCreateInput>
  }

  export type akdataUncheckedUpdateWithoutUserInput = {
    history?: InputJsonValue | InputJsonValue
    pity?: XOR<AkPityUpdateEnvelopeInput, AkPityCreateInput>
    settings?: XOR<AkSettingsUpdateEnvelopeInput, AkSettingsCreateInput>
  }

  export type IntFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntFilter | number
  }
  export type JsonNullableListFilter = 
    | PatchUndefined<
        Either<Required<JsonNullableListFilterBase>, Exclude<keyof Required<JsonNullableListFilterBase>, 'path'>>,
        Required<JsonNullableListFilterBase>
      >
    | OptionalFlat<Omit<Required<JsonNullableListFilterBase>, 'path'>>

  export type JsonNullableListFilterBase = {
    equals?: Enumerable<InputJsonValue> | null
    has?: InputJsonValue | null
    hasEvery?: Enumerable<InputJsonValue>
    hasSome?: Enumerable<InputJsonValue>
    isEmpty?: boolean
  }

  export type BoolFilter = {
    equals?: boolean
    not?: NestedBoolFilter | boolean
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type AkPityUpdatespecialInput = {
    set?: Enumerable<InputJsonValue>
    push?: InputJsonValue | Enumerable<InputJsonValue>
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NestedBoolFilter = {
    equals?: boolean
    not?: NestedBoolFilter | boolean
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}