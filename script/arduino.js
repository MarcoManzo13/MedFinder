import five from 'johnny-five';

export default function connectArduino(board, port) {
    return new five.Board({
        repl: false,
        board,
        port,
    });
}