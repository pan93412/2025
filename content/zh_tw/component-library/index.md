<script setup lang="ts">
import MenuBarDemo from './MenuBarDemo.vue';
import SessionDateDemo from './SessionDateDemo.vue';
import ButtonPrimaryDemo from './ButtonPrimaryDemo.vue';
import ButtonSecondaryDemo from './ButtonSecondaryDemo.vue';
import IconButtonPrimaryDemo from './IconButtonPrimaryDemo.vue';
import IconButtonBasicDemo from './IconButtonBasicDemo.vue';
import BookmarkedDemo from './BookmarkedDemo.vue';
import Tag from '#/components/Tag.vue';
import Card from '#/components/Card.vue';
</script>

# Component Library

## Menu Bar

<MenuBarDemo />

## Session Date

<SessionDateDemo />

## Button

### Primary

<ButtonPrimaryDemo />

### Secondary

<ButtonSecondaryDemo />

### Icon Button / Primary

<IconButtonPrimaryDemo />

### Icon Button / Basic

<IconButtonBasicDemo />

## Icon / Bookmarked

<BookmarkedDemo />

## Tag

<Tag color="#e0e0e0">Tag</Tag>
<Tag color="#ff0000">Tag</Tag>
<Tag color="#00ff00">Tag</Tag>

## Card

<div style="display: grid; gap: 1em; grid-template-columns: repeat(3, 1fr)">
<Card
    title="A 101 in time series analytics with Apache Arrow, Pandas and Parquet"
    time="10:00 ~ 10:30"
    speaker="zoe steinamp"
    tag="主議程軌"
/>

<Card
    title="A 101 in time series analytics with Apache Arrow, Pandas and Parquet"
    time="10:00 ~ 10:30"
    speaker="zoe steinamp"
    tag="主議程軌"
    status="actived"
/>

<Card
    title="A 101 in time series analytics with Apache Arrow, Pandas and Parquet"
    time="10:00 ~ 10:30"
    speaker="zoe steinamp"
    tag="主議程軌"
    status="disabled"
/>

<Card
    title="A 101 in time series analytics with Apache Arrow, Pandas and Parquet"
    time="10:00 ~ 10:30"
    speaker="zoe steinamp"
    tag="主議程軌"
    status="default"
    bookmarked
/>

<Card
    title="A 101 in time series analytics with Apache Arrow, Pandas and Parquet"
    time="10:00 ~ 10:30"
    speaker="zoe steinamp"
    tag="主議程軌"
    status="actived"
    bookmarked
/>

<Card
    title="A 101 in time series analytics with Apache Arrow, Pandas and Parquet"
    time="10:00 ~ 10:30"
    speaker="zoe steinamp"
    tag="主議程軌"
    status="disabled"
    bookmarked
/>

</div>

## Card with yScale

<div style="display: grid; gap: 1em; grid-template-columns: repeat(3, 1fr)">

<Card
    title="A 101 in time series analytics with Apache Arrow, Pandas and Parquet"
    time="10:00 ~ 10:30"
    speaker="zoe steinamp"
    tag="主議程軌"
    :heightFactor="1"
/>

<Card
    title="A 101 in time series analytics with Apache Arrow, Pandas and Parquet"
    time="10:00 ~ 11:00"
    speaker="zoe steinamp"
    tag="主議程軌"
    :heightFactor="2"
/>

<Card
    title="A 101 in time series analytics with Apache Arrow, Pandas and Parquet"
    time="10:00 ~ 11:30"
    speaker="zoe steinamp"
    tag="主議程軌"
    :heightFactor="3"
/>

</div>
