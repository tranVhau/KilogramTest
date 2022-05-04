@extends ('layouts.master')
@section('title', 'Home')

<link rel="stylesheet" href="{{asset('css/home.css')}}">

@section('content')
<!-- section -->
<div class="main">
    <div class="wrapper1">
        <div class="left-col">
            <!---STATUS-->

            <div class="status-wrapper">
                @foreach($friend as $friend)
                <div class="status-card">
                    <div class="profile-pic">
                        <img src="{{asset('image/avt/'.$friend->avatar)}}" alt="" />
                    </div>
                    <a href="{{asset('Kilogram/'.$friend->username)}}" class="username">{{$friend->username}}</a>
                </div>
                @endforeach
            </div>

            <!--POST-->
            @foreach($feed as $feed)
            <div class="post">
                <div class=" info">
                    <div class="user">
                        <div class="profile-pic">
                            <img src="{{asset('image/avt/'.$feed->avatar)}}" alt="" />
                        </div>
                        <a href="{{asset('Kilogram/'.$feed->username)}}" class=" username"
                            style=" font-size:16px">{{$feed->username}}</a>
                    </div>
                    <i class=" fas fa-ellipsis-h options"></i>
                </div>
                <img src="{{asset('image/post/'.$feed->imgdir)}}" class="post-image" />
                <div class="post-content">
                    <div class="reaction-wrapper">
                        <div id="{{$feed->postid}}" class="{{$feed->userid == NULL? " icon-like-0":"icon-like-1"}}">
                            <i class="icon fas fa-heart">
                                <span class="like-count-{{$feed->postid}}  likecountcss">{{$feed->likecount}}</span>
                            </i>
                        </div>
                        <div class="icon-comment" id="{{$feed->postid}}">
                            <i class=" icon fas fa-comment"></i>
                        </div>
                    </div>
                    <div>
                        <p class="description">
                            {{$feed->caption}}
                        </p>
                        <p class="post-time">{{date('d M, h:i', strtotime($feed->created_at)) }}</p>
                    </div>
                </div>

                {{-- <div class="comment-wrapper">
                    <img src="{{asset('img/avatar.jpeg')}}" class="icon" />
                    <input type="text" class="comment-box" placeholder="Add a comment" />
                    <button class="comment-btn">post</button>
                </div> --}}
            </div>
            @endforeach
        </div>
        <div class="right-col">
            <!--Profile-Card-->

            <div class="profile-card">
                <div class="profile-pic">
                    <img src="{{asset('image/avt/'.$avatar)}}" alt="" />
                </div>
                <div>
                    <a href="{{route('profile')}}" class="curr-username">{{$data->username}}</a>
                    <p class="sub-text">{{$data->fullname}}</p>
                </div>
                <a href="{{route('logout')}}" class="logout-btn">logout</a>
            </div>

            <!--Suggestion-Card-->
            <div class="sugguest-section">
                <p class="suggestion-text">Suggestions For you</p>

                @foreach($sugguest as $otherusr)
                <div class="suggestion-card" id={{$otherusr->username}}>
                    <div class="suggestion-pic">
                        <img src="{{asset('image/avt/'.$otherusr->avatar)}}" alt="">
                    </div>
                    <div>
                        <a class="username" href="{{asset('Kilogram/'.$otherusr->username)}}"
                            id="{{$otherusr->username}}">{{$otherusr->username}}</a>
                        <p class="sub-text">{{$otherusr->fullname}}</p>
                    </div>
                    <button class="follow-btn" id={{$otherusr->id}}>follow</button>
                </div>
                @endforeach
            </div>

        </div>
    </div>
    <script src="{{asset('js/home.js')}}"></script>
</div>

@endsection