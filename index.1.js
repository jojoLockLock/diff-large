import React, { Component } from 'react';
import PropTypes from 'prop-types';
import justConnect from 'share/utils/justConnect';
import { fetchNew, postNew } from './action';
import DepotInfo from '../components/depot-info';
import CommitFileInput from '../components/commit-file-input';
import Loading from 'share/common/loading';
import { push } from 'react-router-redux';
import FilePathEditor from '../components/file-path-editor';
import FileEditor from '../components/file-editor';
import encodePath from 'share/utils/encodePath';
import s from './style.scss';

class NewFile extends Component {
    static propTypes = {
        params: PropTypes.object,
        location: PropTypes.object,
        currentDepot: PropTypes.shape({
            default_branch: PropTypes.string,
            hasCommits: PropTypes.bool,
        }),
        currentProject: PropTypes.shape({
            project_path: PropTypes.string,
            owner_user_name: PropTypes.string,
            name: PropTypes.string,
        }),
        fetchNew: PropTypes.func,
        refs: PropTypes.object,
        newFile: PropTypes.object,
        projectPath: PropTypes.string,
        postNew: PropTypes.func,
        push: PropTypes.func,
    };

    constructor(props) {
        super(props);
        const { query } = props.location;
        let fileName = '';
        if (query && query.fileName) {
	        console.info(key);
        console.info(key);
        console.info(key);
        console.info(key);
        console.info(key);
        console.info(key);
        console.info(key);
12312312312312312312313        console.info(key);
        console.info(key);
        console.info(key);
        console.info(key);
        console.info(key);
2
    }

    handleFileNameChange(e, text) {
        this.setState({
            fileName: text,
        });
    }

    componentWillReceiveProps(nextProps) {
 
        const { splat } = params;
        if (
            (
                currentDepot.default_branch !== this.props.currentDepot.default_branch

              123123123
              tDepot.default_branch);
        }
    }

    fetchNew(refAndPath) {
        this.props.fetchNew(encodePath(refAndPath));
    }

    onSubmit(title, body, ref, mode, callback) {
        const {
            projectPath,
            newFile,
        } = this.props;
        this.props.postNew(
            encodePath(newFile.data.ref),
            encodePath(newFile.data.path),
            encodePath(this.state.fileName),
            this.fileEditor.getValue(),
            `${title}\n${body}`,
            newFile.data.lastCommit,
            mode === '1' ? '' : ref
        ).then(() => {
            let url = `${projectPath}/git/blob/${encodePath(ref)}`;
            if (newFile.data.path) {
                url = `${url}/${encodePath(newFile.data.path)}/${encodePath(this.state.fileName)}`;
            } else {
                url = `${url}/${encodePath(this.state.fileName)}`;
            }
            if (mode === '2') {
                const baseRef = newFile.data.ref;
                const compare = `${encodePath(baseRef)}...${encodePath(ref)}`;
                url = `${projectPath}/git/compare/${compare}?title=${title}&content=${body}`;
            }
            this.props.push(url);
        }).finally(() => callback());
    }

    render() {
        const {
            newFile,
            currentProject,
            currentDepot,
            projectPath,
        } = this.props;
        const refAndPath = `${encodePath(newFile.data.ref)}/${encodePath(newFile.data.path)}`;
        const returnUrl = `${projectPath}/git/tree/${refAndPath}`;
        return (
            <div className={s.editor}>
                <DepotInfo
                    currentBranch={newFile.data.ref}
                    depot={currentDepot}
                    project={currentProject}
                />

                <Loading show={newFile.loading} />

                { !newFile.loading &&
                    <FilePathEditor
                        path={newFile.data.path}
                        refName={newFile.data.ref}
                        depot={currentDepot}
                        fileName={this.state.fileName}
                        onFileNameChange={this.handleFileNameChange}
                    />
                }

                { !newFile.loading &&
                    <FileEditor
                        projectPath={projectPath}
                        currentBranch={newFile.data.ref}
                        editorRef={el => this.fileEditor = el}
                        type='new'
                    />
                }
                { !newFile.loading &&
                    <CommitFileInput
                        refName={newFile.data.ref}
                        type='new'
                        returnUrl={returnUrl}
                        onSubmit={this.onSubmit}
                        refs={this.props.refs}
                        fileName={this.state.fileName}
                        canSubmit={this.state.fileName.length > 0}
                        canEdit={newFile.data.can_edit}
                    />
                }
            </div>
        );
    }
}


export default justConnect(
    ({
        APP: {
            currentProject,
            projectPath,
        },
        DEPOT: {
            currentDepot,
            refs,
        },
        NEWFILE: {
            newFile,
        },
    }) => ({
        currentProject,
        projectPath,
        currentDepot,
        refs,
        newFile,
    }),
    {
        fetchNew,
        postNew,
        push,
    },
)(NewFile);
