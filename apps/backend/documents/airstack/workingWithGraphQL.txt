Working with GraphQL

In GraphQL, logical comparators like \_and , \_nor, and \_or are used to combine multiple filtering conditions, allowing you to create more complex queries. These logical comparators can only be used between unique filter inputs only. In order to add comparators to one specific filter check the information below. Here's a brief explanation of each:

Using GraphQL logical comparators
\_and: AND - Combines multiple filtering conditions, and only returns the data that meets all the specified conditions. Note: the relationship between multiple selected filters is always AND by default.
\_nor: NOR (Not OR) - Combines multiple filtering conditions, and only returns the data that does not meet any of the specified conditions.

\_or: OR - Combines multiple filtering conditions, and returns the data that meets at least one of the specified conditions.

In addition to the filtering conditions, Airstack GraphQL also has the following comparators which are used to filter data in queries based on specified conditions. They are shorthand for various comparison operations:
\_eq: Equals - Filters the data where the specified field is equal to the provided value.
\_gt: Greater Than - Filters the data where the specified field is greater than the provided
\_gte: Greater Than or Equal - Filters the data where the specified field is greater than or equal to the provided value.
\_lt: Less Than - Filters the data where the specified field is less than the provided value.
\_lte: Less Than or Equal - Filters the data where the specified field is less than or equal to the provided value.
\_ne: Not Equal - Filters the data where the specified field is not equal to the provided value.
\_in: In - Filters the data where the specified field's value is within the provided array of values.

\_nin: Not In - Filters the data where the specified field's value is not within the provided array of values.
