export enum Policy {
    POST_CREATE = 'post.create',
    POST_UPDATE = 'post.update',
    POST_UPDATE_SELF = 'post.update.self',
    POST_DELETE = 'post.delete',
    POST_DELETE_SELF = 'post.delete.self',
    POST = 'post.*',
    TOPIC_CREATE = 'topic.create',
    TOPIC_UPDATE = 'topic.update',
    TOPIC_DELETE = 'topic.delete',
    TOPIC = 'topic.*',
}

export function isPolicyAllowed(policies: Policy[], required: Policy) {
    for (const policy of policies) {
        if (policy === required) {
            return true;
        }

        // foo.* matches foo.bar, foo.baz, ...
        if (policy.endsWith('.*') && required.startsWith(policy.slice(0, -2))) {
            return true;
        }
    }

    return false;
}
