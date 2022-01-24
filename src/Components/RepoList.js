import React from 'react'
import {Repo} from './Repo'

function RepoList(props) {
    return (
        <div>
            {props.repos.map((repo)=>(
                <Repo repo={repo}/>)
            )}
        </div>
    )
}

export default RepoList
