import { ReactNode, memo } from 'react';

function ReleaseNotes(): ReactNode {
    return (
        <div style={{ height: '100vh' }}>
            <nav className="flex items-center justify-between flex-wrap bg-blue-600  p-6">
                <div className="flex items-center flex-no-shrink text-white mr-6 w-full justify-start">
                    <span className="font-semibold text-xl tracking-tight">Release Notes</span>
                </div>
            </nav>
            <div className="min-h-screen flex flex-row">
                <div className="flex flex-col bg-gray-100   text-white w-6/12 mobile:hidden">
                    <ul className="flex flex-col py-4 sticky top-0  divide-y divide-y divide-gray-400">
                        <li className={'m-2 ml-4'}>
                            <a className={'flex flex-col items-left h-12 cursor-pointer'}>
                                <div className="text-sm font-medium text-gray-900">Version 1.0</div>
                                <div className="text-sm font-medium text-gray-900">Wednesday 25 Oct, 2023</div>
                            </a>
                        </li>
                    </ul>
                </div>
                <div>
                    <div className="tab-content tab-space w-5/6 divide-y divide-light-blue-400">
                        <div className={'text-gray-900 text-2xl p-2 mt-16 w-40 my-4 ml-8'}>Version 1.0</div>
                        <div className={'block'}>
                            <div>
                                <section className="flex flex-col  mb-10">
                                    <div className="w-36 h-auto leading-8 ml-10 text-left font-bold shadow-lg mt-10 mb-3 text-white rounded-md">
                                        <span className="ml-4">New Releases</span>
                                    </div>
                                    <div className="text-left ml-20 mt-4 text-white">
                                        Movie Content List now showing lots of movies.
                                    </div>
                                    <div className="text-left ml-20 mt-4 text-white">
                                        Movie Content List is searchable.
                                    </div>
                                    <div className="text-left ml-20 mt-4 text-white">Super Mobile Responsive.</div>
                                    <div className="text-left ml-20 mt-4 text-white">Infinite Scroll.</div>
                                </section>

                                <section className="flex flex-col  mb-10">
                                    <div className="w-36 h-auto leading-8 ml-10 text-left font-bold shadow-lg mt-10 mb-3 text-white rounded-md">
                                        <span className="ml-4">Soon!</span>
                                    </div>
                                    <div className="text-left ml-20 mt-4 text-white">
                                        More updates will be coming very soon! Stay tuned.
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default memo(ReleaseNotes);
