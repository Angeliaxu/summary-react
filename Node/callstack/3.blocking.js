/* 
    1.  there is no strict definition:just code slow
    2.  the js runtime can do one thing at a time but the browser gives us these other things,give us these we shall APIs,these are effectively threads,
    u can just make calls to,and those pieces of the browser are aware of this concurrency knicks in 
    3.  setTimeout is an API provided to us by the browser,it doesn't live in the V8 source
    4.  any of the web APIs pushes the callback on to the task queue when it's done
    5.  the event loops job is to look at the stack and look at the task queue，if the stack is empty it takes the first thing on the queue and pushes it on to the stack
    6. callbacks can be  one of two things,callbacks can be any function that another function calls or callbacks can be more explicityly an asynchronous callback
    7. the foreach method on an array,it doesn't run,it takes a function,which you could call a callback,but it's not running it asynchronously,it's running it 
    within the current stack
*/