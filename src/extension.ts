import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

    console.log('Congratulations, your extension "test-task-execution" is now active!');

    let disposable = vscode.commands.registerCommand('test-task-execution.helloWorld', async () => {

        var tasks = await vscode.tasks.fetchTasks();
        for (var t of tasks) {
            if (t.name === "echo") {
                // This is the generated json for a task created with `Task: Configured tasks ...`
                // reveal has the value 'always' and not 1
                /*
                {
                  name: 'echo',
                  source: 1,
                  scope: 1,
                  definition: { type: 'shell' },
                  execution: ShellExecution { shellCommandLine: 'echo Hello', shellOptions: {} },
                  presentationOptions: {
                    echo: true,
                    reveal: 'always',
                    focus: false,
                    panel: 'shared',
                    showReuseMessage: true,
                    clear: false
                  }
                }
                */
                console.log(t);
                vscode.tasks.executeTask(t); // KO the task is not revealed
                break;
            }
        }
        
        var message = 'Hello World from vscode-test-task-execution! This message should be displayed in a Task terminal.'
        vscode.window.showInformationMessage(message);

        var execution = new vscode.ShellExecution("echo \"" + message + "\"", {});
        var task:vscode.Task = {
            name: "hello",
            scope: 1,
            source: 'task',
            definition: { type: 'shell' },
            execution: execution,
            presentationOptions: {
                echo: true,
                // Uncomment one of the following:
                reveal: JSON.parse('"always"'), // KO the task is not revealed
                // reveal: vscode.TaskRevealKind.Always, //OK the task is revealed
                focus: false,
            },
            isBackground: false,
            runOptions: {},
            problemMatchers: []
        }
        console.log(task);
        vscode.tasks.executeTask(task);
    });

    context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() { }
