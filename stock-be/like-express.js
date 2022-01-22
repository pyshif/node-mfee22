class LikeExpress {
    constructor() {
        this.queue = Array();
    }

    use(callback) {
        // 如果有帶第三個參數 next，則將它推入佇列(queue)
        if (callback.length === 3) {
            this.queue.push(callback);
        }
    }

    receiveRequest() {
        const next = () => {
            this.queue.shift()(1, 2, next);
        };

        next();
    }

    // handle(req, res, stack) {
    //     const next = () => {
    //         const middle = stack.shift();

    //         if (middle) {
    //             middle(req, res, next);
    //         }
    //     };

    //     next();
    // }
}

const app = new LikeExpress();

app.use(function (req, res, next) {
    console.log('task 1');
    next();
});

app.use(function (req, res, next) {
    console.log('task 2');
    next();
});

app.use(function (req, res, next) {
    console.log('task 3');
    next();
});

// app.handle(1, 2, app.queue);

app.receiveRequest();
