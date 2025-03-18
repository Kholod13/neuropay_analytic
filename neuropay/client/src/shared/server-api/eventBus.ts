import mitt from 'mitt';

type ServerEvents = {
    unauthenticated: undefined
}

export default mitt<ServerEvents>();
