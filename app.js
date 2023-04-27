const App = () => {

    // State Variables
    const[data, setData] = React.useState([]);
    const[selectedArticles, setSelectedArticles] = React.useState([]);
    const [selectAllChecked, setSelectAllChecked] = React.useState(false);
    const[showModal, setShowModal] = React.useState(false);
    const[modalContent, setModalContent] = React.useState({
        content:"",
        author:"",
        title:"",
        date:"",
      });
    
    // Function to fetch data from json file
    React.useEffect(() => {
        fetch('data.json')
            .then(response => response.json())
            .then(json => setData(json))
            .then(data => {handleSelectAll(null, data);})
            .catch(error => console.error(error));
    }, []);

    // Function to get id of article and add it to array
    const handleSelectArticle = (event, id) => {
        if (event.target.checked) {
            setSelectedArticles([...selectedArticles, id]);
        } else {
            setSelectedArticles(selectedArticles.filter(article => article !== id));
        }
    };

    // Function to remove selected articles
    const handleRemoveArticles = () => {
        setData(data.filter(article => !selectedArticles.includes(article.id)));
        setSelectedArticles([]);
    };

    // Function to send all data of specific article to modal
    const handleReadFull = (content, author, title, date) => {
        setModalContent({
          content: content,
          author: author,
          title: title,
          date: date,
        });
        setShowModal(true);
      };
    
    // Exit Modal function and reset modal content
    const handleCloseModal = () => {
        setShowModal(false);
        setModalContent("");
    };

    // Function to trigger exit modal function if user clicks outise of modal
    const handleModalClick = (event) => {
        if (event.target === event.currentTarget) {
            handleCloseModal();
        }
    };

    // select all checkboxes
    const handleSelectAll = (event,data) => {
        const checkboxes = document.querySelectorAll('.checkbox-class');
        const allIds = data.map((article) => article.id);

        if (selectAllChecked) {
            checkboxes.forEach((checkbox) => {checkbox.checked = event.target.unchecked;});
            setSelectedArticles([]);
            setSelectAllChecked(false);
        } else {
            checkboxes.forEach((checkbox) => {checkbox.checked = event.target.checked;});
            setSelectedArticles(allIds);
            setSelectAllChecked(true);
        }
    };

//return html layout
    return ( 
    <div>
    <div>
        <h1>News Articles</h1>
    </div>  

    <div className="flex-space-between">
        <div className="controls"> 
            <input type="checkbox" onChange={(event) => handleSelectAll(event, data)} checked={selectAllChecked} />
            <button className="button btn-blue">Publish</button>
            <button  className="button btn-red"onClick={handleRemoveArticles}>Delete</button>
        </div>
        <div className="searchbar"> 
            <input type="text" placeholder="Search ..."></input>
        </div>
    </div>
       
    <div className="data-body">
        {data.map(article => (
            <div key={article.id}>
                <div className="data-group flex-space-between">
                <div className="flex-start">
                    <div className="drag-svg">
                        <svg className="svg" height="35px" width="30px" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg" fill="#000000">
                        <g id="SVGRepo_iconCarrier" transform="scale(2.1)"><g fill="#000000" fillRule="evenodd">
                        <path d="m7 5h2v2h-2z"></path><path d="m12 5h2v2h-2z"></path><path d="m7 9h2v2h-2z"></path>
                        <path d="m12 9h2v2h-2z"></path><path d="m7 13h2v2h-2z"></path><path d="m12 13h2v2h-2z"></path></g></g>
                        </svg>
                    </div>
                    <div className="p-1">
                        <input type="checkbox" className="checkbox-class" onChange={event => handleSelectArticle(event, article.id) } />
                    </div>
                    <div>
                        <h2>{article.title}</h2>
                        <div className="flex-start faded fw-500">
                            <div className="mr-1">
                                <svg xmlns="http://www.w3.org/2000/svg"  width="30" height="30" fill="rgb(74, 180, 88)" className="bi bi-person-circle" viewBox="0 0 16 16">
                                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                                <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                                </svg>
                            </div>
                            <p className="mr-1">{article.author}</p>
                            <div className="mr-1">
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="rgb(74, 180, 88)" className="bi bi-calendar-week" viewBox="0 0 16 16">
                                <path d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm-3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm-5 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1z"/>
                                <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
                                </svg>
                            </div>
                            <p className="mr-1">{article.date}</p>
                        </div>  
                        <div className="flex-start">
                            <p className="content-container faded">
                            {article.content}    
                            </p>
                            <div>
                                <a href="#" className="flex-start" onClick={() => handleReadFull(article.content,article.author,article.title,article.date)}>                 
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-eye-fill" viewBox="0 0 16 16">
                                    <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
                                    <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
                                    </svg>
                                    <p>Read Full</p>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>   
                <div> 
                    <button className="button tags">#Sports</button>
                    <button className="button tags">#Worldwide</button>
                    <button className="button tags">#Local</button>                                
                </div>
                </div>
            </div>  
        ))}          
    </div>

        {showModal && (
            <div className="modal" onClick={handleModalClick}>
            <div className="modal_body">
                <div className="mb-2 flex-space-between">
                <h2>{modalContent.title}</h2>                    
                <span className="modal_close" onClick={handleCloseModal}>&times;</span>
                </div>
                <h2 className="mb-2 faded fw-500">
                    {modalContent.author} | {modalContent.date}</h2>
                <p className="modal-content">{modalContent.content}</p>
                <div className="center">
                    <button className="btn modal-btn-blue">Publish</button>
                    <button className="btn modal-btn-red">Delete</button>
                </div>
            </div>
            </div>
        )}
    </div>
    );
};
ReactDOM.render(<App />, document.getElementById('root'));